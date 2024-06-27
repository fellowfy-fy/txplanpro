from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import Doctor, Patient, ClinicPhoto, PatientPhoto
from io import BytesIO
from PIL import Image

class PatientPhotoUploadTest(APITestCase):
    def setUp(self):
        # Create a test user and doctor
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.doctor = Doctor.objects.create(user=self.user)
        self.client = APIClient()
        self.client.login(username='testuser', password='testpass')
        
        # Create a test patient
        self.patient = Patient.objects.create(
            name='Test Patient',
            diagnosis='Test Diagnosis',
            treatment_plan={},
            teeth_status={},
            doctor=self.doctor
        )

    def generate_photo_file(self):
        # Generate a test image file
        file = BytesIO()
        image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test_photo.png'
        file.seek(0)
        return file

    def test_upload_patient_photos(self):
        url = reverse('patient-photo-upload')
        photo1 = self.generate_photo_file()
        photo2 = self.generate_photo_file()
        
        data = {
            'patient_id': self.patient.id,
            'photos': [photo1, photo2],
        }

        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('photos', response.data)
        self.assertEqual(len(response.data['photos']), 2)

        # Check that the photos are actually saved in the database
        self.assertEqual(PatientPhoto.objects.filter(patient=self.patient).count(), 2)

class DoctorPhotoUploadTest(APITestCase):
    def setUp(self):
        # Create a test user and doctor
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.doctor = Doctor.objects.create(user=self.user)
        self.client = APIClient()
        self.client.login(username='testuser', password='testpass')

    def generate_photo_file(self):
        # Generate a test image file
        file = BytesIO()
        image = Image.new('RGBA', size=(100, 100), color=(155, 0, 0))
        image.save(file, 'png')
        file.name = 'test_photo.png'
        file.seek(0)
        return file

    def test_upload_clinic_photos(self):
        url = reverse('doctor-photo-upload')
        photo1 = self.generate_photo_file()
        photo2 = self.generate_photo_file()
        
        data = {
            'clinic_photos': [photo1, photo2],
        }

        response = self.client.post(url, data, format='multipart')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('clinic_photos', response.data)
        self.assertEqual(len(response.data['clinic_photos']), 2)

        # Check that the photos are actually saved in the database
        self.assertEqual(ClinicPhoto.objects.filter(doctor=self.doctor).count(), 2)
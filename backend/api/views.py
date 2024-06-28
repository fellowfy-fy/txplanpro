from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView, RetrieveAPIView
from .serializers import DoctorSerializer, PatientSerializer, ClinicPhotoSerializer, PatientPhotoSerializer
from .models import Doctor, Patient, ClinicPhoto, PatientPhoto
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.http import FileResponse, Http404

class RegisterView(CreateAPIView):
    queryset = Doctor.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DoctorSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreatePatient(CreateAPIView):
    queryset = Patient.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PatientSerializer

    def perform_create(self, serializer):
        doctor = Doctor.objects.get(user=self.request.user)
        serializer.save(doctor=doctor)

class ListPatient(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PatientSerializer
    
    def get_queryset(self):
        doctor = Doctor.objects.get(user=self.request.user)
        return Patient.objects.filter(doctor=doctor)

class DoctorPhotoUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        doctor = Doctor.objects.get(user=request.user)
        
        # Handle break photo
        break_photo = request.FILES.get('break_photo')
        if break_photo:
            doctor.break_photo = break_photo
            doctor.save()

        # Handle clinic photos
        clinic_photos = request.FILES.getlist('clinic_photos')
        for photo in clinic_photos:
            ClinicPhoto.objects.create(doctor=doctor, photo=photo)

        serializer = DoctorSerializer(doctor)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PatientPhotoUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        patient_id = request.data.get('patient_id')
        patient = Patient.objects.get(id=patient_id)

        # Handle multiple photos
        photos = request.FILES.getlist('photos')
        for photo in photos:
            PatientPhoto.objects.create(patient=patient, photo=photo)

        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateClinicPhotoView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, *args, **kwargs):
        try:
            clinic_photo = ClinicPhoto.objects.get(pk=pk)
        except ClinicPhoto.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Ensure the authenticated doctor is the owner of the photo
        if clinic_photo.doctor.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        photo = request.FILES.get('photo')
        if photo:
            clinic_photo.photo = photo
            clinic_photo.save()

        serializer = ClinicPhotoSerializer(clinic_photo)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdatePatientPhotoView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def put(self, request, pk, *args, **kwargs):
        try:
            patient_photo = PatientPhoto.objects.get(pk=pk)
        except PatientPhoto.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Ensure the authenticated doctor is the owner of the patient
        if patient_photo.patient.doctor.user != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        photo = request.FILES.get('photo')
        if photo:
            patient_photo.photo = photo
            patient_photo.save()

        serializer = PatientPhotoSerializer(patient_photo)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdatePatient(UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure that the authenticated user is the doctor of the patient
        doctor = Doctor.objects.get(user=self.request.user)
        return Patient.objects.filter(doctor=doctor)

class UpdateDoctor(UpdateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Ensure that the authenticated user is the doctor being updated
        return Doctor.objects.get(user=self.request.user)

class DoctorDetailView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        doctor = get_object_or_404(Doctor, user=user)
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)
    
    
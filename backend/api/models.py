from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userpic = models.ImageField(upload_to='doctor_userpics/', null=True)
    break_photo = models.ImageField(upload_to='clinic_photos/break_photo', null=True)

    def __str__(self):
        return self.user.username

class ClinicPhoto(models.Model):
    doctor = models.ForeignKey(Doctor, related_name='clinic_photos', on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='clinic_photos/')

    def __str__(self):
        return f"{self.doctor.user.username} - {self.id}"

class Patient(models.Model):
    name = models.CharField(max_length=100)
    diagnosis = models.TextField(default="")
    xray = models.ImageField(upload_to='patient_xrays/', null=True)
    treatment_plan = models.JSONField(null=True)
    teeth_status = models.JSONField(null=True)   
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='patients')

    def __str__(self):
        return self.name

class PatientPhoto(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to='patient_photos/')

    def __str__(self):
        return f"{self.patient.name} - {self.id}"
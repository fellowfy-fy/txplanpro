from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    name = models.CharField(max_length=100)
    diagnosis = models.TextField()
    photos = models.ImageField(upload_to='patient_photos/')
    xray = models.ImageField(upload_to='patient_xrays/')
    treatment_plan = models.TextField()
    teeth_status = models.TextField()

    def __str__(self):
        return self.name

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userpic = models.ImageField(upload_to='doctor_userpics/')

    def __str__(self):
        return self.user.username
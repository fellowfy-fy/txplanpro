from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    userpic = models.ImageField(upload_to='doctor_userpics/')

    def __str__(self):
        return self.user.username
    
class Patient(models.Model):
    name = models.CharField(max_length=100)
    diagnosis = models.TextField()
    photos = models.ImageField(upload_to='patient_photos/')
    xray = models.ImageField(upload_to='patient_xrays/')
    treatment_plan = models.JSONField()
    teeth_status = models.JSONField()   
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='patients')


    def __str__(self):
        return self.name

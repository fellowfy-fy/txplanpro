# myapp/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Patient, ClinicPhoto, PatientPhoto

class ClinicPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicPhoto
        fields = ['photo']

class PatientPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientPhoto
        fields = ['photo']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    clinic_photos = ClinicPhotoSerializer(many=True, read_only=True)
    break_photo = serializers.ImageField(required=False)

    class Meta:
        model = Doctor
        fields = ['user', 'userpic', 'clinic_photos', 'break_photo']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        doctor = Doctor.objects.create(user=user, **validated_data)
        return doctor

class PatientSerializer(serializers.ModelSerializer):
    photos = PatientPhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Patient
        fields = ['name', 'diagnosis', 'photos', 'xray', 'treatment_plan', 'teeth_status']

# myapp/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Doctor, Patient, ClinicPhoto, PatientPhoto
from django.core.files import File
import os

class ClinicPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicPhoto
        fields = ['id' ,'photo']
        
    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo:
            photo_url = obj.photo.url
            if request is not None:
                return request.build_absolute_uri(photo_url)
            return photo_url
        return None

class PatientPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientPhoto
        fields = ['id', 'photo']
        
    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo:
            photo_url = obj.photo.url
            if request is not None:
                return request.build_absolute_uri(photo_url)
            return photo_url
        return None

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    clinic_photos = ClinicPhotoSerializer(many=True, read_only=True)
    break_photo = serializers.ImageField(required=False)

    class Meta:
        model = Doctor
        fields = ['user', 'userpic', 'clinic_photos', 'break_photo', 'static_text']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer.create(UserSerializer(), validated_data=user_data)
        doctor = Doctor.objects.create(user=user, **validated_data)
        
        # Define the default photo names and paths
        default_photos = {
            "Intro": "static/default_photos/intro.jpg",
            "Vision": "static/default_photos/vision.jpg",
            "Break": "static/default_photos/break.jpg",
        }

        # Create ClinicPhoto instances
        for name, path in default_photos.items():
            with open(path, 'rb') as photo_file:
                clinic_photo = ClinicPhoto(doctor=doctor)
                clinic_photo.photo.save(os.path.basename(path), File(photo_file), save=True)

        return doctor

class DoctorUpdateSerializer(serializers.ModelSerializer):
    clinic_photos = ClinicPhotoSerializer(many=True, read_only=True)
    break_photo = serializers.ImageField(required=False)

    class Meta:
        model = Doctor
        fields = ['userpic', 'clinic_photos', 'break_photo', 'static_text']

class PatientSerializer(serializers.ModelSerializer):
    photos = PatientPhotoSerializer(many=True, read_only=True)
    
    class Meta:
        model = Patient
        fields = ['id', 'name', 'diagnosis', 'photos', 'xray', 'treatment_plan', 'teeth_status']

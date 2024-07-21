from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static
from api.views import RegisterView, CreatePatient, ListPatient, DoctorPhotoUploadView, PatientPhotoUploadView, UpdateDoctor, UpdatePatient, UpdateClinicPhotoView, UpdatePatientPhotoView, DoctorDetailView, PatientDetailView, DoctorPhotoDeleteView
from pdf.views import GeneratePDF

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),  
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/patients/', CreatePatient.as_view(), name='create_patient'),
    path('api/patients/get/', ListPatient.as_view(), name='create_patient'),
    path('api/doctor/upload_photos/', DoctorPhotoUploadView.as_view(), name='doctor-photo-upload'),
    path('api/patient/upload_photos/', PatientPhotoUploadView.as_view(), name='patient-photo-upload'),
    path('api/patients/<int:pk>/update/', UpdatePatient.as_view(), name='update-patient'),
    path('api/doctors/update/', UpdateDoctor.as_view(), name='update-doctor'),
    path('api/clinic_photo/<int:pk>/update/', UpdateClinicPhotoView.as_view(), name='update-clinic-photo'),
    path('api/patient_photo/<int:pk>/update/', UpdatePatientPhotoView.as_view(), name='update-patient-photo'),   
    path('api/doctor/me/', DoctorDetailView.as_view(), name='doctor-detail'),
    path('api/patients/<int:pk>/', PatientDetailView.as_view(), name='patient-detail'),
    path('api/doctor/delete_photos/', DoctorPhotoDeleteView.as_view(), name='delete-clinic-photo'),
    path('api/generate-pdf/', GeneratePDF.as_view(), name='generate_pdf'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

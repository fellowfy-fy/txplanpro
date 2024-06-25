# myapp/admin.py

from django.contrib import admin
from .models import Patient, Doctor

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'diagnosis', 'treatment_plan', 'teeth_status')
    search_fields = ('name', 'diagnosis')
    list_filter = ('diagnosis',)

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('user', 'userpic')
    search_fields = ('user__username', 'user__email')

# Alternative way of registering models
# admin.site.register(Patient, PatientAdmin)
# admin.site.register(Doctor, DoctorAdmin)

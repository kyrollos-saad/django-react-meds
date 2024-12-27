from django.contrib import admin
from django.urls import include, path
from pyramids_auth.urls import pyraminds_auth_router
from pyramids_api.urls import pyraminds_api_router

urlpatterns = [
    path("admin/", admin.site.urls),
    path('auth/', include(pyraminds_auth_router.urls)),
    path('api/', include(pyraminds_api_router.urls)),
]

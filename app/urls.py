from django.contrib import admin
from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.mural, name='mural'), 
    path('add/', views.add_mensagem, name='add'),
    path('delete/<int:id>/', views.delete_mensagem, name='delete')
]




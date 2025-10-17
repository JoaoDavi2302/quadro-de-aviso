from django.db import models

class Mensagem(models.Model):
    pessoa = models.CharField(max_length=30)
    conteudo = models.CharField(max_length=220)
    data = models.DateTimeField(auto_now_add=True)
    hora = models.DateTimeField(auto_now=True)


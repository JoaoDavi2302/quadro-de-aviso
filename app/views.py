from django.shortcuts import render
from django.shortcuts import redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.http import HttpResponseNotAllowed
from .models import Mensagem
from .forms import MensagemForm


# Exibir avisos
def mural(request):
    mensagem = Mensagem.objects.all()
    form = MensagemForm()
    return render(request, "index.html", {"mensagem": mensagem, "form": form})

# Criar avisos
def add_mensagem(request):
    if request.method == 'POST':
        form = MensagemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
        else:
            print(form.errors)
    else:
        form = MensagemForm()

    return redirect('/')

# Deletar avisos
def delete_mensagem(request,id):
    if request.method == 'DELETE':
        mensagem = get_object_or_404(Mensagem, id=id)
        mensagem.delete()
        return JsonResponse({'status': 'ok'})
    else:
        return HttpResponseNotAllowed(['DELETE'])
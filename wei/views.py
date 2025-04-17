from django.shortcuts import render

def home(request):
    return render(request, "index.html")

def about(request):
    return render(request, "about.html")

def test(request):
    return render(request, "test.html")


def button_onetest(request):
    return render(request, "button_onetest.html")
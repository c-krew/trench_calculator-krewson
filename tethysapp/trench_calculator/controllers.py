from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from tethys_sdk.gizmos import Button

@login_required()
def home(request):
    """
    Controller for the app home page.
    """


    context = {
    }

    return render(request, 'trench_calculator/home.html', context)

@login_required()
def map_view(request):
    """
    Controller for the app home page.
    """


    context = {
    }

    return render(request, 'trench_calculator/map_view.html', context)

@login_required()
def data_services(request):
    """
    Controller for the app home page.
    """


    context = {
    }

    return render(request, 'trench_calculator/data_services.html', context)

@login_required()
def about(request):
    """
    Controller for the app home page.
    """


    context = {
    }

    return render(request, 'trench_calculator/about.html', context)

@login_required()
def proposal(request):
    """
    Controller for the app home page.
    """


    context = {
    }

    return render(request, 'trench_calculator/proposal.html', context)

@login_required()
def mockups(request):
    """
    Controller for the app home page.
    """


    context = {
    }

    return render(request, 'trench_calculator/mockups.html', context)
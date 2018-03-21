from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from tethys_sdk.gizmos import *
import json

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

    toggledem = ToggleSwitch(display_text='Styled Toggle',
                                        name='toggledem',
                                        on_label='Yes',
                                        off_label='No',
                                        on_style='success',
                                        off_style='danger',
                                        initial=True,
                                        size='large',
                                     )


    toggle_switch_mun = ToggleSwitch(display_text='Styled Toggle',
                                        name='togglemun',
                                        on_label='Yes',
                                        off_label='No',
                                        on_style='success',
                                        off_style='danger',
                                        initial=True,
                                        size='large',
                                     )

    dimensionsbut = Button(display_text='Update Dimensions',
                             name='dimensions',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={"onclick": "dimensionmodal()"},
                             classes=''
                        )

    calculate = Button(display_text='Calculate Quantities',
                             name='calculate',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={},
                             classes=''
                       )

    results = Button(display_text='View Results',
                             name='results',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={"onclick": "resultmodal()"},
                             classes=''
                       )

    dimension_edit = TableView(column_names=('Dimension', 'Value (ft)'),
                                rows=[('width top (wt)', 7),
                                      ('width bottom (wb)', 5),
                                      ('depth (d)', 10),
                                      ('pipe zone depth (pd)', 2),
                                      ('pipe diameter (dia)', 1),
                                      ],
                                hover=True,
                                striped=True,
                                bordered=True,
                                condensed=True,
                                editable_columns=(False, 'Value (ft)'),
                                row_ids=[21, 25, 31]
                               )


    resulttable = TableView(column_names=('Quantity', 'Value (CY)'),
                                rows=[('Offhaul', 500),
                                      ('Bedding Import', 150),
                                      ('Backfill Import', 300),
                                      ],
                                hover=True,
                                striped=True,
                                bordered=True,
                                condensed=True
                            )

    context = {
        'toggledem':toggledem,
        'toggle_switch_mun': toggle_switch_mun,
        'dimensionsbut':dimensionsbut,
        'calculate': calculate,
        'results': results,
        'dimension_edit': dimension_edit,
        'resulttable': resulttable,
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

@login_required()
def map_view_buffer(request):
    """
    Controller for the app home page.
    """

    toggledem = ToggleSwitch(display_text='Styled Toggle',
                                        name='toggledem',
                                        on_label='Yes',
                                        off_label='No',
                                        on_style='success',
                                        off_style='danger',
                                        initial=True,
                                        size='large',
                                     )


    toggle_switch_mun = ToggleSwitch(display_text='Styled Toggle',
                                        name='togglemun',
                                        on_label='Yes',
                                        off_label='No',
                                        on_style='success',
                                        off_style='danger',
                                        initial=True,
                                        size='large',
                                     )

    dimensionsbut = Button(display_text='Update Dimensions',
                             name='dimensions',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={"onclick": "dimensionmodal()"},
                             classes=''
                        )

    calculate = Button(display_text='Calculate Quantities',
                             name='calculate',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={},
                             classes=''
                       )

    results = Button(display_text='View Results',
                             name='results',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={"onclick": "resultmodal()"},
                             classes=''
                       )

    dimension_edit = TableView(column_names=('Dimension', 'Value (ft)'),
                                rows=[('width top (wt)', 7),
                                      ('width bottom (wb)', 5),
                                      ('depth (d)', 10),
                                      ('pipe zone depth (pd)', 2),
                                      ('pipe diameter (dia)', 1),
                                      ],
                                hover=True,
                                striped=True,
                                bordered=True,
                                condensed=True,
                                editable_columns=(False, 'Value (ft)'),
                                row_ids=[21, 25, 31]
                               )


    resulttable = TableView(column_names=('Quantity', 'Value (CY)'),
                                rows=[('Offhaul', 500),
                                      ('Bedding Import', 150),
                                      ('Backfill Import', 300),
                                      ],
                                hover=True,
                                striped=True,
                                bordered=True,
                                condensed=True
                            )

    context = {
        'toggledem':toggledem,
        'toggle_switch_mun': toggle_switch_mun,
        'dimensionsbut':dimensionsbut,
        'calculate': calculate,
        'results': results,
        'dimension_edit': dimension_edit,
        'resulttable': resulttable,
    }

    return render(request, 'trench_calculator/map_view_buffer.html', context)

@login_required()
def map_view_slope(request):
    """
    Controller for the app home page.
    """

    toggledem = ToggleSwitch(display_text='Styled Toggle',
                                        name='toggledem',
                                        on_label='Yes',
                                        off_label='No',
                                        on_style='success',
                                        off_style='danger',
                                        initial=True,
                                        size='large',
                                     )


    toggle_switch_mun = ToggleSwitch(display_text='Styled Toggle',
                                        name='togglemun',
                                        on_label='Yes',
                                        off_label='No',
                                        on_style='success',
                                        off_style='danger',
                                        initial=True,
                                        size='large',
                                     )

    dimensionsbut = Button(display_text='Update Dimensions',
                             name='dimensions',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={"onclick": "dimensionmodal()"},
                             classes=''
                        )

    calculate = Button(display_text='Calculate Quantities',
                             name='calculate',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={},
                             classes=''
                       )

    results = Button(display_text='View Results',
                             name='results',
                             style='',
                             icon='',
                             href='',
                             submit=False,
                             disabled=False,
                             attributes={"onclick": "resultmodal()"},
                             classes=''
                       )

    dimension_edit = TableView(column_names=('Dimension', 'Value (ft)'),
                                rows=[('width top (wt)', 7),
                                      ('width bottom (wb)', 5),
                                      ('depth (d)', 10),
                                      ('pipe zone depth (pd)', 2),
                                      ('pipe diameter (dia)', 1),
                                      ],
                                hover=True,
                                striped=True,
                                bordered=True,
                                condensed=True,
                                editable_columns=(False, 'Value (ft)'),
                                row_ids=[21, 25, 31]
                               )


    resulttable = TableView(column_names=('Quantity', 'Value (CY)'),
                                rows=[('Offhaul', 500),
                                      ('Bedding Import', 150),
                                      ('Backfill Import', 300),
                                      ],
                                hover=True,
                                striped=True,
                                bordered=True,
                                condensed=True
                            )

    percent_input = TextInput(display_text='Split Percentage (i.e. 5% = 20 points)',
                           name='percentinput',
                           placeholder='',
                           prepend='%',
                            )

    context = {
        'toggledem':toggledem,
        'toggle_switch_mun': toggle_switch_mun,
        'dimensionsbut':dimensionsbut,
        'calculate': calculate,
        'results': results,
        'dimension_edit': dimension_edit,
        'resulttable': resulttable,
        'percent_input': percent_input
    }

    return render(request, 'trench_calculator/map_view_slope.html', context)
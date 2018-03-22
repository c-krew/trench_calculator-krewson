from tethys_sdk.base import TethysAppBase, url_map_maker


class TrenchCalculator(TethysAppBase):
    """
    Tethys app class for Trench Calculator.
    """

    name = 'Trench Calculator'
    index = 'trench_calculator:home'
    icon = 'trench_calculator/images/icon.gif'
    package = 'trench_calculator'
    root_url = 'trench-calculator'
    color = '#2c3e50'
    description = 'Calculates import and export quantities fpipe installation trenches.'
    tags = '&quot;Construction&quot;'
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='trench-calculator',
                controller='trench_calculator.controllers.home'
            ),
            UrlMap(
                name='map_view',
                url='trench-calculator/map_view',
                controller='trench_calculator.controllers.map_view'
            ),
            UrlMap(
                name='map_view_buffer',
                url='trench-calculator/map_view_buffer',
                controller='trench_calculator.controllers.map_view_buffer'
            ),
            UrlMap(
                name='map_view_slope',
                url='trench-calculator/map_view_slope',
                controller='trench_calculator.controllers.map_view_slope'
            ),
            UrlMap(
                name='map_view_split',
                url='trench-calculator/map_view_split',
                controller='trench_calculator.controllers.map_view_split'
            ),
            UrlMap(
                name='data_services',
                url='trench-calculator/data_services',
                controller='trench_calculator.controllers.data_services'
            ),
            UrlMap(
                name='about',
                url='trench-calculator/about',
                controller='trench_calculator.controllers.about'
            ),
            UrlMap(
                name='proposal',
                url='trench-calculator/proposal',
                controller='trench_calculator.controllers.proposal'
            ),
            UrlMap(
                name='mockups',
                url='trench-calculator/mockups',
                controller='trench_calculator.controllers.mockups'
            )
        )

        return url_maps

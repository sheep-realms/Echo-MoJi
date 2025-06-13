const config = {
    "data_version": 1,
    "global": {
        "language": "zho-Hans",
        "color_scheme": "auto",
        "touchscreen_layout": false,
        "controller_layout_reverse": false,
        "thin_scrollbar": false
    },
    "echomoji": {
        "style": {
            "theme": "void",
            "theme_script_enable": false,
            "text_color": "",
            "background_color": "",
            "font_size": "",
            "font_weight": "",
            "font_family": "'思源黑体'"
        },
        "message": {
            "duration": 10000,
            "random_method": "weighted",
            "random_weight_init": 1,
            "random_weight_step": 1,
            "random_weight_reset_negative_rate": 0.35,
            "allow_variable": true
        },
        "message_in_effect": {
            "name": "fade-in",
            "duration": 150,
            "scale": 1,
            "timing_function": "ease-out"
        },
        "message_out_effect": {
            "name": "fade-out",
            "duration": 150,
            "scale": 1,
            "timing_function": "ease-in"
        }
    },
    "accessibility": {
        "font_size": 16,
        "unlock_page_width": false,
        "high_contrast": false,
        "high_contrast_outline_color": "#00E9FF",
        "high_contrast_outline_size": "2px",
        "high_contrast_outline_style": "solid",
        "protanopia_and_deuteranopia": false,
        "link_underline": false,
        "animation_disable": false,
        "power_saving_mode": false
    },
    "advanced": {
        "settings": {
            "display_config_key": false,
            "display_hidden_option": false
        },
        "performance": {
            "row_search_threshold": 1
        }
    }
}
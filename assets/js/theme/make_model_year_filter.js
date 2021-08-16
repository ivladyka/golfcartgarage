import { yswFilterData } from './make_model_year_data';

var yswFA = {};
yswFA = {
	settings: {
		page_type:'',
		show_con_logs: false
	},
	setCookie : function(name,value,days,domain,path) {
		if (days) {
			if (days == 0) {
				var expires = "";
			} else {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				//date.setTime(date.getTime()+(minutes*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
		}
		else var expires = "";
		if (domain) {
			var cdomain = "; domain=" + domain;
		} else {
			var cdomain = "";
		}
		if (path) {
			var cpath = "; path=" + path;
		} else {
			var cpath = "; path=/";
		}
		document.cookie = name+"="+encodeURIComponent(value)+expires+cdomain+cpath;
	},
	eraseCookie : function (name, domain, path) {
		yswFA.setCookie(name,"",-1, domain, path);
	},
	getCookie : function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length,c.length));
		}
		return null;
    },
    selectMake: function (value) {
        $('.ysw_fa_start_view select#ysw_filter_make').val(value).trigger('change');
    },
    setYearHelpLink: function () {
        // Year link
        var make_position = null;
        if ($('.ysw_fa_start_view #ysw_filter_make').val() == "I don't know") {
            // get from model
            make_position = $('.ysw_fa_start_view #ysw_filter_model option:selected').data('make-position');
        } else {
            // get from make
            make_position = $('.ysw_fa_start_view #ysw_filter_make option:selected').data('make-position');
        }

        if (make_position != null) {
            //var year_link_html = 'Not sure about the year of your ' + make_name + '? <a href="' + yswFilterData.dropdown_data[make_position].year_link + '" target="_blank">Click here</a>';

            var year_link_html = 'Need help finding year of your cart? <a href="' + yswFilterData.dropdown_data[make_position].year_link + '" target="_blank">Click here</a>';

            $('.ysw_fa_start_view .ysw_filter_step_3 .year-help').html(year_link_html);
        }
        else {
            // remove year link
            $('.ysw_fa_start_view .ysw_filter_step_3 .year-help').html('');
        }
    },
    setSubmitButtonState: function () {
        var make_name = $('.ysw_fa_start_view select#ysw_filter_make').val();
        var model_name = $('.ysw_fa_start_view select#ysw_filter_model').val();
        var disableButton = false;
        if (make_name.length == 0) {
            disableButton = true;
        } else if (model_name.length == 0 && make_name != "Other") {
            disableButton = true;
        }
        $('.ysw_fa_start_view button#ysw_filter_submit').prop('disabled', disableButton);
    },
	app_events: function() {

		// Show Products
		$(document).on('click','.ysw_fa_start_view button#ysw_filter_submit', function() {

			var option = '';

			var make_name = $('.ysw_fa_start_view select#ysw_filter_make').val();
			var model_name = $('.ysw_fa_start_view select#ysw_filter_model').val();
			var year = $('.ysw_fa_start_view select#ysw_filter_year').val();

			if(make_name.length == 0) {

				alert('Please select a Make from Step 1, or choose "I don\'t know" if you are unsure.');

			} else if(model_name.length == 0 && make_name != "Other") {

				alert('Please select a Model from Step 2, or choose "I don\'t know" if you are unsure.');

			}/*else if(year.length == 0 && !(model_name == "I don't know" && make_name == "I don't know") && make_name != "Other") {

				alert('Please select a Year from Step 3, or choose "I don\'t know" if you are unsure.');

			} */ else {

				
				if(make_name == 'Other') {

					// Make == Other, go to universal parts page

					option = 'Other';

				} else if(make_name == "I don't know" && model_name == "I don't know") {

					// Make == I dont know && Model == I dont know, go to help page

					option = 'Help';

				} else if(make_name == "I don't know") {

					// Make == I don't know - we can determine based on model value we have (make + model + year (if populated))

					// Find and assign the make name
					yswFilterData.dropdown_data.forEach(function(make) {
						make.models.forEach(function(model) {
							if(model.name == model_name) {
								// we have a match
								make_name = make.name;
							}
						})
					})

					option = make_name + '_' + model_name;

				} else if(model_name == "I don't know") {

					// Model == I don't know (make + year (if populated))

					option = make_name;

				} else {

					// we have both make and model

					option = make_name + '_' + model_name;

				}

				// get URL
				
				var redirect_url = window.location.pathname + "?list_all=year";
				/*yswFilterData.redirects.forEach(function (loop_option) {
					if (option == loop_option.option) {
						// we have a match
						redirect_url = loop_option.url;
					}
				})*/

				// delete old cookies
				yswFA.eraseCookie('ysw_fa_make');
				yswFA.eraseCookie('ysw_fa_model');
				yswFA.eraseCookie('ysw_fa_year');

				// add make filter to URL
				// there will always be a Make
				redirect_url += '&_bc_fsnf=1&make=' + encodeURIComponent(make_name);
				// set new cookie
				// 30 days
				yswFA.setCookie('ysw_fa_make', make_name, 30);

				// add Model filter to URL if present
				if (model_name.length > 0 && model_name != "I don't know") {
					redirect_url += '&model=' + encodeURIComponent(model_name);
					// set new cookie
					// 30 days
					yswFA.setCookie('ysw_fa_model', model_name, 30);
				}

				// add on year if present
				if (year.length > 0 && year != "I don't know") {
					redirect_url += '&year=' + encodeURIComponent(year);
					// set new cookie
					// 30 days
					yswFA.setCookie('ysw_fa_year', year, 30);
				}

				//	$('#ysw_fa_wrapper #option_combination').text('Redirect URL: ' + redirect_url);

				if (yswFA.settings.page_type == 'category') {
					// redirect
					window.location = redirect_url;
				}
				else {
					// update locked view
					yswFA.update_locked_view();

					// show locked view
					$('#ysw_fa_wrapper').removeClass('start').addClass('locked');
				}

			}


		});

		// Step 1 dropdown
		$(document).on('change','.ysw_fa_start_view select#ysw_filter_make', function() {

            $('.ysw_fa_start_view .ysw_fa_submit_container').show();
            var make_name = $('.ysw_fa_start_view select#ysw_filter_make').val();

			// enable / disable Step 2 dropdown
			if(make_name.length > 0 && make_name != "Other") {
                $('.ysw_fa_start_view .ysw_filter_step_1').hide();
                $('.ysw_fa_start_view .ysw_filter_step_2').show();
                $('.ysw_fa_start_view .ysw_filter_step_3').show();
				// enable

				// remove existing option in Step 2
				$('.ysw_fa_start_view select#ysw_filter_model option[data-option]').remove();

				var step2_html = '';

				// dynamically populate options
				if(make_name == "I don't know") {

					// populate with all Models (step 2)
					yswFilterData.dropdown_data.forEach(function(make,i1) {
							make.models.forEach(function(model,i2) {
								step2_html += '<option value="' + model.name + '" data-option="true" data-make-position="' + i1 + '">' + model.name + '</option>';
							})
                    })
                    $(".ysw_filter_step_2 .step-title").text("Now, Select your model and year.");

				} else {

					// populate with Make models (step 2)
					yswFilterData.dropdown_data.forEach(function(make) {
						if(make.name == make_name) {
							// we have a match
							make.models.forEach(function(model,index) {
								step2_html += '<option value="' + model.name + '" data-option="true" data-make-position="' + index + '">' + model.name + '</option>';
							})
						}
					})
                    $(".ysw_filter_step_2 .step-title").html("What is the model and year of your <b>" + make_name + "</b>?");
				}

				$(step2_html).insertAfter('.ysw_fa_start_view select#ysw_filter_model option:nth-child(1)');

				$('.ysw_fa_start_view select#ysw_filter_model').prop('selectedIndex',0).trigger('change');

				// Enable Step 2
				$('.ysw_fa_start_view .ysw_filter_step_2').removeClass('step_disabled');
				$('.ysw_fa_start_view select#ysw_filter_model').prop('disabled', false);

			} else {

				// disable

				// remove options for step 2
				$('.ysw_fa_start_view select#ysw_filter_model option[data-option]').remove();


				// remove options except first one
				// disable step 2
				$('.ysw_fa_start_view .ysw_filter_step_2').addClass('step_disabled');
				$('.ysw_fa_start_view select#ysw_filter_model').prop('selectedIndex',0).trigger('change');
				$('.ysw_fa_start_view select#ysw_filter_model').prop('disabled', true);
			}
            yswFA.setYearHelpLink();
            yswFA.setSubmitButtonState();
		});

		// Step 2 dropdown
		$(document).on('change','.ysw_fa_start_view select#ysw_filter_model', function() {

			var make_name = $('.ysw_fa_start_view select#ysw_filter_make').val();
			var model_name = $('.ysw_fa_start_view select#ysw_filter_model').val();

			// enable / disable Step 3 dropdown
			if(model_name.length > 0 && !(model_name == "I don't know" && make_name == "I don't know")) {

				// enable

				// remove existing option in Step 3
				$('.ysw_fa_start_view select#ysw_filter_year option[data-option]').remove();

				var step3_html = '';

				// dynamically populate options
				if(model_name == "I don't know") {

					// populate with all Make years (step 3)
					yswFilterData.dropdown_data.forEach(function(make) {
						if(make.name == make_name) {
							// we have a match	
							make.years.forEach(function(year,index) {
								step3_html += '<option value="' + year + '" data-option="true">' + year + '</option>';
							})
						}
					})

				} else {

					if(make_name == "I don't know") {
						// Find and assign the make name
						yswFilterData.dropdown_data.forEach(function(make) {
							make.models.forEach(function(model) {
								if(model.name == model_name) {
									// we have a match
									make_name = make.name;
								}
							})
						})
					}

					// populate with Model years (step 3)
					yswFilterData.dropdown_data.forEach(function(make) {
						if(make.name == make_name) {
							// we have a match
							make.models.forEach(function(model) {
								if(model.name == model_name) {
									// we have a match
									model.years.forEach(function(year,index) {
										step3_html += '<option value="' + year + '" data-option="true">' + year + '</option>';
									})
									
								}
							})
						}
					})

				}

				$(step3_html).insertAfter('.ysw_fa_start_view select#ysw_filter_year option:nth-child(1)');

				$('.ysw_fa_start_view select#ysw_filter_year').prop('selectedIndex',0).trigger('change');

				// Enable step 3
				$('.ysw_fa_start_view .ysw_filter_step_3').removeClass('step_disabled');
				$('.ysw_fa_start_view select#ysw_filter_year').prop('disabled', false);
				
			} else {

				// disable

				// remove options for step 3
				$('.ysw_fa_start_view select#ysw_filter_year option[data-option]').remove();

				// remove options except first one
				// disable step 3
				$('.ysw_fa_start_view .ysw_filter_step_3').addClass('step_disabled');
				$('.ysw_fa_start_view select#ysw_filter_year').prop('selectedIndex',0).trigger('change');
				$('.ysw_fa_start_view select#ysw_filter_year').prop('disabled', true);
			}

            yswFA.setYearHelpLink();
            yswFA.setSubmitButtonState();
		});

		// Locked view - Change golf cart
		$(document).on('click','.ysw_fa_locked_view a.change', function() {

			// don't delete cookies

			// show start view
			$('#ysw_fa_wrapper').removeClass('locked').addClass('start');

		})

		// Locked view - Remove golf cart
		$(document).on('click','.ysw_fa_locked_view a.remove', function() {

			// delete cookies
			yswFA.eraseCookie('ysw_fa_make');
			yswFA.eraseCookie('ysw_fa_model');
			yswFA.eraseCookie('ysw_fa_year');

			// redirect user
			if(yswFA.settings.page_type == 'category') {
				window.location = window.location.pathname;
			} else if(yswFA.settings.page_type == 'search') {

				// search page

				var search_term = encodeURIComponent($('.ysw-hidden-search-query').text());
				var redirect_url = window.location.pathname + '?search_query=' + search_term;

				window.location = redirect_url;

			} else {

				// home page

				location.reload();

			}

		})

		
		// Error message option - Return to previous page
		$(document).on('click','.ysw_fa_error_message .ysw_fa_options li:nth-child(1) a', function() {
			window.history.back();
		})

		// Error message option - Change Golf Cart
		$(document).on('click','.ysw_fa_error_message .ysw_fa_options li a.change', function() {

			// don't delete cookies

			// hide error messages
			$('.ysw_fa_error_message').removeClass('show');

			// show start view
			$('#ysw_fa_wrapper').removeClass('locked').addClass('start');

		})

		// Error message option - Remove Golf Cart
		$(document).on('click','.ysw_fa_error_message .ysw_fa_options li a.remove', function() {

			// delete cookies
			yswFA.eraseCookie('ysw_fa_make');
			yswFA.eraseCookie('ysw_fa_model');
			yswFA.eraseCookie('ysw_fa_year');

			// redirect user

			// there is a scenario in which we'll need to reload the page. 
			// If filters are already present in the URL, like when the user comes from our app
			// shouldn't happen, but just in case

			if(yswFA.settings.page_type == 'category') {
				window.location = window.location.pathname;
			} else {

				// search page

				location.reload();

				//var search_term = encodeURIComponent($('.ysw-hidden-search-query').text());
				//var redirect_url = window.location.pathname + '?search_query=' + search_term;
			}

        })
		// Select Club Car Logo
		$(document).on('click', '.ysw_fa_start_view #ysw_club_car', function () {
			yswFA.selectMake('Club Car');
		})
		$(document).on('click', '.ysw_fa_start_view #ysw_ezgo', function () {
			yswFA.selectMake('EZGO');
		})
        // Select Harley Davidson Logo
		$(document).on('click', '.ysw_fa_start_view #ysw_harley_davidson', function () {
			yswFA.selectMake('Harley Davidson');
		})

		// Select Taylor-Dunn Logo
		$(document).on('click', '.ysw_fa_start_view #ysw_taylor-dunn', function () {
			yswFA.selectMake('Taylor-Dunn');
		})

		// Select Star EV Logo
		$(document).on('click', '.ysw_fa_start_view #ysw_star_evn', function () {
			yswFA.selectMake('Star EV');
		})

		// Select Columbia/Par Car Logo
		$(document).on('click', '.ysw_fa_start_view #ysw_columbia_par_car', function () {
			yswFA.selectMake('Columbia/Par Car');
		})


        // Select EZGO Logo
		$(document).on('click', '.ysw_fa_start_view #ysw_cushman', function () {
			yswFA.selectMake('Cushman');
        })

        // Select Yamaha Logo
        $(document).on('click', '.ysw_fa_start_view #ysw_yamaha', function () {
            yswFA.selectMake('Yamaha');
        })

        // Select Other Link
        $(document).on('click', '.ysw_fa_start_view #ysw_other', function () {
            yswFA.selectMake('Other');
        })

        // Select I don't know Link
        $(document).on('click', '.ysw_fa_start_view #ysw_dont_know', function () {
            yswFA.selectMake("I don't know");
        })
	},
	update_locked_view: function() {

		if(yswFA.getCookie('ysw_fa_make')) {
			var make = yswFA.getCookie('ysw_fa_make');
		}

		if(yswFA.getCookie('ysw_fa_model')) {
			var model = yswFA.getCookie('ysw_fa_model');
		}

		if(yswFA.getCookie('ysw_fa_year')) {
			var year = yswFA.getCookie('ysw_fa_year');
		}

		var selection_text = [];

		year && selection_text.push(year);
		make && selection_text.push(make);
		model && selection_text.push(model);

		$('.ysw_fa_locked_view .ysw_fa_selection span').html(selection_text.join(' '));

	},
	show_validation_error_message: function() {

		if(yswFA.settings.show_con_logs) { console.log('show validation error message'); }

		var selection_text = '';

		if(yswFA.getCookie('ysw_fa_make')) {
			var make = yswFA.getCookie('ysw_fa_make');
		}

		if(yswFA.getCookie('ysw_fa_model')) {
			var model = yswFA.getCookie('ysw_fa_model');
		}

		if(yswFA.getCookie('ysw_fa_year')) {
			var year = yswFA.getCookie('ysw_fa_year');
		}

		if(make && model && year) {
			selection_text = year + ' ' + make + ' ' + model;
		} else if(make && model) {
			selection_text = make + ' ' + model;
		} else if(make && year) {
			selection_text = year + ' ' + make;
		} else if(make) {
			selection_text = make;
		}

		$('.ysw_fa_error_message .ysw_fa_message').html('No products found for ' + selection_text + ' in this category.');

		$('#product-listing-container').html('<p>No products found for ' + selection_text + ' in this category.</p>');

		$('.ysw_fa_error_message').addClass('show');

	},
	go: function() {

		if(yswFA.settings.show_con_logs) { console.log('run YSW filter app'); }

		// populate Make dropdown
		var step1_html = '';
		yswFilterData.dropdown_data.forEach(function(make, index) {
			step1_html += '<option value="' + make.name + '" data-option="true" data-make-position="' + index + '">' + make.name + '</option>';
		})
		$(step1_html).insertAfter('.ysw_fa_start_view select#ysw_filter_make option:nth-child(1)');

		// attach events
		yswFA.app_events();

		if(yswFA.settings.show_con_logs) { console.log('page type is: ' + yswFA.settings.page_type); }

		// if home page
		if(yswFA.settings.page_type == 'home' || yswFA.settings.page_type == 'brand' || yswFA.settings.page_type == 'brands') {

			// If make exists
			if(yswFA.getCookie('ysw_fa_make')) {

				// update locked view
				yswFA.update_locked_view();

				// show locked view
				$('#ysw_fa_wrapper').removeClass('start').addClass('locked');

			} else {

				// delete cookies
				// cookies shouldn't be set, but we're not explicitely checking all 3, so delete model and year to be sure
				yswFA.eraseCookie('ysw_fa_model');
				yswFA.eraseCookie('ysw_fa_year');

				// show start view
				$('#ysw_fa_wrapper').removeClass('locked').addClass('start');

			}

		} else if(yswFA.settings.page_type == 'category' || yswFA.settings.page_type == 'search') {


			// search or category page

			// If make exists
			if(yswFA.getCookie('ysw_fa_make')) {

				// If list_all=year is not present in the URL then add it and redirect
				// This only runs if Make cookie exists, so only runs when we actually need this to be present in the URL
				if(window.location.search.indexOf('list_all=year') == -1) {

					var redirect_url = window.location.href;

					// check for ?
					if(window.location.search.indexOf('?') > -1) {
						redirect_url += '&list_all=year';
					} else {
						redirect_url += '?list_all=year';
					}

					if(yswFA.settings.show_con_logs) { console.log('list_all=year not found in URL. Add and Redirect.'); }

					window.location = redirect_url;

					return;
				}

				var validation_error = false;

				/*** Check if all cookied values are AVAILABLE as filters on page ***/

				// check if make filter is available
				var available_makes = [];
				var make = yswFA.getCookie('ysw_fa_make');
				$('#ysw-hidden-available-filters ul[data-filter-name="make"] li').each(function() {
					available_makes.push($(this).text());
				})
				if(yswFA.settings.show_con_logs) { console.log(available_makes); }
				if(available_makes.indexOf(make) > -1) {
					if(yswFA.settings.show_con_logs) { console.log(make + ' Make is available!'); }
				} else {
					if(yswFA.settings.show_con_logs) { console.log(make + ' Make is NOT available! Show user message'); }
					validation_error = true;
				}
				
				// if model cookie
				if(yswFA.getCookie('ysw_fa_model')) {
					var available_models = [];
					var model = yswFA.getCookie('ysw_fa_model');
					$('#ysw-hidden-available-filters ul[data-filter-name="model"] li').each(function() {
						available_models.push($(this).text());
					})
					if(yswFA.settings.show_con_logs) { console.log(available_models); }
					if(available_models.indexOf(model) > -1) {
						if(yswFA.settings.show_con_logs) { console.log(model + ' Model is available!'); }
					} else {
						if(yswFA.settings.show_con_logs) { console.log(model + ' Model is NOT available! Show user message'); }
						//validation_error = true;
					}
				}

				// if year cookie
				if(yswFA.getCookie('ysw_fa_year')) {
					var available_years = [];
					var year = yswFA.getCookie('ysw_fa_year');
					$('#ysw-hidden-available-filters ul[data-filter-name="year"] li').each(function() {
						available_years.push($(this).text());
					})
					if(yswFA.settings.show_con_logs) { console.log(available_years); }
					if(available_years.indexOf(year) > -1) {
						if(yswFA.settings.show_con_logs) { console.log(year + ' Year is available!'); }
					} else {
						if(yswFA.settings.show_con_logs) { console.log(year + ' Year is NOT available! Show user message'); }
						validation_error = true;
					}
				}

				if(validation_error == true) {

					// Validation error
					// Show user message
					yswFA.show_validation_error_message();

				} else {

					/*** Check if all cookied values are SELECTED as filters on page ***/
					/*** Rebuild URL if needed ***/

					// if it's search page (not category) we need to add in the search query, and &_bc_fsnf=1
					if(yswFA.settings.page_type == 'search') {
						var search_term = encodeURIComponent($('.ysw-hidden-search-query').text());
						var redirect_url = window.location.pathname + '?search_query=' + search_term + '&section=product&_bc_fsnf=1&list_all=year';
					} else {
						var redirect_url = window.location.pathname + '?_bc_fsnf=1&list_all=year';
					}

					var rebuild_url_needed = false;

					// check if filters are selected
					// can do this by checking ysw-hidden-filter-selected
					/** start: make check ***/
					var selected_make = $('.ysw-hidden-filter-selected[data-filter-name="make"]');
					if(selected_make.length > 0) {
						if(make == selected_make.text()) {
							if(yswFA.settings.show_con_logs) { console.log(make + ' Make is already selected'); }
							redirect_url += '&make=' + encodeURIComponent(make);
						} else {
							// this should never run, unless user modifies the URL directly without using app first, which could happen if URLs are being used for Ads or something, need to account for it
							if(yswFA.settings.show_con_logs) { console.log('A Make is already selected, but its not ' + make + '. Replace with ' + make + '.'); }
							rebuild_url_needed = true;
							redirect_url += '&make=' + encodeURIComponent(make);
						}
					} else {
						if(yswFA.settings.show_con_logs) { console.log('Make is not selected yet. It is required.'); }
						rebuild_url_needed = true;
						redirect_url += '&make=' + encodeURIComponent(make);
					}
					/** end: make check ***/
					/** start: model check ***/
					// only enforce is model cookie exists
					if(model) {
						var selected_model = $('.ysw-hidden-filter-selected[data-filter-name="model"]');
						if(selected_model.length > 0) {
							if(model == selected_model.text()) {
								if(yswFA.settings.show_con_logs) { console.log(model + ' Model is already selected'); }
								redirect_url += '&model=' + encodeURIComponent(model);
							} else {
								// this should never run, unless user modifies the URL directly without using app first, which could happen if URLs are being used for Ads or something, need to account for it
								if(yswFA.settings.show_con_logs) { console.log('A Model is already selected, but its not ' + model + '. Replace with ' + model + '.'); }
								rebuild_url_needed = true;
								redirect_url += '&model=' + encodeURIComponent(model);
							}
						} else {
							if(yswFA.settings.show_con_logs) { console.log('Model is not selected yet. It is required because there is a cookie for it.'); }
							//rebuild_url_needed = true;
							redirect_url += '&model=' + encodeURIComponent(model);
						}
					}
					/** end: model check ***/
					/** start: year check ***/
					// only enforce if year cookie exists
					if(year) {
						var selected_year = $('.ysw-hidden-filter-selected[data-filter-name="year"]');
						if(selected_year.length > 0) {
							if(year == selected_year.text()) {
								if(yswFA.settings.show_con_logs) { console.log(year + ' Year is already selected'); }
								redirect_url += '&year=' + encodeURIComponent(year);
							} else {
								// this should never run, unless user modifies the URL directly without using app first, which could happen if URLs are being used for Ads or something, need to account for it
								if(yswFA.settings.show_con_logs) { console.log('A Year is already selected, but its not ' + year + '. Replace with ' + year + '.'); }
								rebuild_url_needed = true;
								redirect_url += '&year=' + encodeURIComponent(year);
							}
						} else {
							if(yswFA.settings.show_con_logs) { console.log('Year is not selected yet. It is required because there is a cookie for it.'); }
							rebuild_url_needed = true;
							redirect_url += '&year=' + encodeURIComponent(year);
						}
					}
					/** end: year check ***/


					if(rebuild_url_needed == false) {

						if(yswFA.settings.show_con_logs) { console.log('dont redirect - all filters are already selected'); }

						// update locked view
						yswFA.update_locked_view();

						// show locked view
						$('#ysw_fa_wrapper').removeClass('start').addClass('locked');

					} else {

						if(yswFA.settings.show_con_logs) { console.log('redirect user to: ' + redirect_url); }

						// redirect
						window.location = redirect_url;

					}


					

				}

			} else {

				// delete cookies
				// cookies shouldn't be set, but we're not explicitely checking all 3, so delete model and year to be sure
				yswFA.eraseCookie('ysw_fa_model');
				yswFA.eraseCookie('ysw_fa_year');

				// show start view
				$('#ysw_fa_wrapper').removeClass('locked').addClass('start');

			}


		}

	}
}

export default yswFA;






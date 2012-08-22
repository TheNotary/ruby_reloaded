RubyReloaded::Application.routes.draw do
  get "cute_lil_functions/get_matrix_html_from_dimensions"
  get "cute_lil_functions/get_sum_of_squares_data_for_array"

  get "pages/home"

  match '/', :to => 'pages#home'
  match '/sum_squares', :to => 'pages#sum_squares'
end

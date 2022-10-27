Rails.application.routes.draw do
  resources :friendships, only: %i[create destroy]
  resources :users, except: %i[index]

  # Login / Logout User
  post '/login', to: 'users#login'
  delete '/logout', to: 'users#logout'

  # External API call to get location information
  post '/location', to:'zipcode#location'
end

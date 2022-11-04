Rails.application.routes.draw do
  resources :biography_blocks
  resources :participations, only: %i[create]
  resources :events
  resources :chats
  resources :messages
  resources :friendships, only: %i[create destroy]
  resources :users

  # Login / Logout User
  post '/login', to: 'users#login'
  delete '/logout', to: 'users#logout'
  get '/profile', to:'users#profile'

  delete '/participations/:user_id/:event_id', to: 'participations#destroy'

  # External API call to get location information
  post '/location', to:'zipcode#location'
  post '/coordinates', to:'zipcode#coordinates'

  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

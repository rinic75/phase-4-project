Rails.application.routes.draw do
  
  resources :appointments, only: [:index, :show, :create, :update, :destroy]
  resources :golfpros, only: [:index, :show]

  get '/clients', to: 'clients#index'
  get '/me', to: 'clients#me'
  get '/myappointments', to: 'clients#myappointments'
  get '/clients/:id', to: 'clients#show'
  patch '/clients/:id', to: 'clients#update'
  delete '/clients/:id', to: 'clients#destroy'

  post '/signup', to: 'clients#create'
  post '/login', to: 'sessions#login'
  delete '/logout', to: 'sessions#logout'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :questions, only: %i[ index create ] do
        resources :answers, only: %i[ index create ]
        member do
          put :update_counter
        end
      end      
    end
  end
  
end

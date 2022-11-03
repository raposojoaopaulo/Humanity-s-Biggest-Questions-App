Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :questions, only: %i[ index create ] do
        member do
          put :update_counter
        end
        resources :answers, only: %i[ index create ]
      end      
    end
  end
  
end

TictactoeHanoi::Application.routes.draw do
  root to: "games#root"
  get '/hanoi',  to: 'games#hanoi'
  get '/snake', to: 'games#snake'
end


TictactoeHanoi::Application.routes.draw do
  root to: "games#root"
  get '/hanoi',  to: 'games#hanoi'
end


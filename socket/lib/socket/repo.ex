defmodule Socket.Repo do
  use Ecto.Repo,
    otp_app: :socket,
    adapter: Ecto.Adapters.Postgres
end

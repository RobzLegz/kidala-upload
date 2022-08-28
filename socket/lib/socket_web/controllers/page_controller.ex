defmodule SocketWeb.PageController do
  use SocketWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

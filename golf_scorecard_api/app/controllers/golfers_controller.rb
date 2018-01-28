class GolfersController < ApplicationController
  before_action :set_golfer, only: [:show, :update, :destroy]

  # GET /golfers
  def index
    @golfers = Golfer.all

    render json: @golfers.to_json(include: :scorecards)
  end

  # GET /golfers/1
  def show
    render(json: @golfer.to_json(include: :scorecards))
  end

  # POST /golfers
  def create
    @golfer = Golfer.new(golfer_params)

    if @golfer.save
      render json: @golfer, status: :created, location: @golfer
    else
      render json: @golfer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /golfers/1
  def update
    if @golfer.update(golfer_params)
      render json: @golfer
    else
      render json: @golfer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /golfers/1
  def destroy
    @golfer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_golfer
      @golfer = Golfer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def golfer_params
      params.require(:golfer).permit(:course, :player, :totalscore, :totalpar)
    end
end

class BiographyBlocksController < ApplicationController
  before_action :set_biography_block, only: %i[ show update destroy ]
  skip_before_action :authorize, only: %i[ index show ]

  # GET /biography_blocks
  def index
    @biography_blocks = BiographyBlock.all

    render json: @biography_blocks
  end

  # GET /biography_blocks/1
  def show
    render json: @biography_block
  end

  # POST /biography_blocks
  def create
    @biography_block = BiographyBlock.create!(biography_block_params)
    render json: @biography_block, status: :created
  end

  # PATCH/PUT /biography_blocks/1
  def update
    @biography_block.update!(biography_block_params)
    render json: @biography_block, status: 204
  end

  # DELETE /biography_blocks/1
  def destroy
    @biography_block.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_biography_block
      @biography_block = BiographyBlock.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def biography_block_params
      params.require(:biography_block).permit(:title, :content, :user_id)
    end
end

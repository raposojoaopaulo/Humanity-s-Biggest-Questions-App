class Api::V1::AnswersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_question

  def index
    @answers = @questions.answers
    render json: @answers
  end

  private

  def set_question
    @questions = Question.find(params[:question_id])
  end
end
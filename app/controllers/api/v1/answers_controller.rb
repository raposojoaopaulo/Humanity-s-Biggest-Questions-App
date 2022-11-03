class Api::V1::AnswersController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :set_question

  def index
    @answers = @questions.answers
    render json: @answers
  end

  def create
    @answer = @questions.answers.new(answer_params)
    if @answer.save
      render json: @answer
    else
      render json: { errors: @answer.errors.full_messages, status: 'failure' }, status: :unprocessable_entity
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:body)
  end

  def set_question
    @questions = Question.find(params[:question_id])
  end
end
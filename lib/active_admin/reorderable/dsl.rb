module ActiveAdmin
  module Reorderable
    module DSL
      private

      def reorderable(&block)
        body = proc do
          _insert_params = [ params[:position].to_i ]
          #
          _insert_params << params[:parent_type] if params[:parent_type].present?
          _insert_params << params[:parent_id] if params[:parent_id].present?
          #
          resource.insert_at(*_insert_params)
          head :ok
        end

        member_action(:reorder, :method => :post, &block || body)
      end
    end
  end
end

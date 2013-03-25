module Helpers
  def rating_for(rateable_obj, dimension=nil, options={})

    if dimension.nil?
      klass = rateable_obj.average
    else
      klass = rateable_obj.average "#{dimension}"
    end

    if klass.nil?
      avg = 0
    else
      avg = klass.avg
    end

    star = options[:star] || 5

    readonly = !current_user.present?


    content_tag :div, '', "data-dimension" => dimension, :class => "star", "data-rating" => avg,
                "data-id" => rateable_obj.id, "data-classname" => rateable_obj.class.name,
                "data-disable-after-rate" => false,
                "data-not-rated-text" => options[:not_rated_text], # Only seen when readonly is true
                "data-readonly" => readonly,
                "data-star-count" => star
  end

end

class ActionView::Base
  include Helpers
end

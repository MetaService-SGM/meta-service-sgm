class PositionSerializer
  def self.call(position)
    {
      id: position.id,
      name: position.name
    }
  end
end

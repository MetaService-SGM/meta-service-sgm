puts '🌟 Creating Certifications...'

certification_names = [
  "NR-10 - Electrical Safety",
  "NR-30 - Aquatic Work Safety",
  "NR-33 - Confined Spaces",
  "NR-35 - Working at Heights",
  "Transport of Chemical Materials",
  "Transport of Flammables",
  "First Aid",
  "Firefighting",
  "Defensive Driving",
  "Forklift Operation",
  "Overhead Crane Operation",
  "Crane Operation",
  "Handling Chemical Products",
  "CIPA - Internal Accident Prevention Commission",
  "Workplace Ergonomics",
  "PPE Usage",
  "Safety Signage",
  "Occupational Hygiene",
  "Emergency Response",
  "Hazardous Materials Safety"
]

certifications = certification_names * 2

employees = Employee.all
positions = Position.all

pdf_path = Rails.root.join('db', 'seeds', 'files', 'dummy.pdf')

if employees.empty? || positions.empty?
  puts "⚠️ No employee or position found. Make sure to seed employees and positions first."
elsif !File.exist?(pdf_path)
  puts "❌ PDF file not found at #{pdf_path}. Please make sure it exists."
else
  certifications.each_with_index do |name, index|
    employee = employees.sample
    position = positions.sample
    issue_date = Faker::Date.between(from: 2.years.ago, to: Date.today)
    expiration_date = issue_date + [1.year, 2.years, 3.years].sample

    certification = Certification.new(
      name: name,
      issue_date: issue_date,
      expiration_date: expiration_date,
      employee: employee,
      position: position
    )

    certification.pdf.attach(
      io: File.open(pdf_path),
      filename: "certification_#{index}.pdf",
      content_type: 'application/pdf'
    )

    certification.save!
  end

  puts "✅ #{certifications.size} certifications successfully created!"
end

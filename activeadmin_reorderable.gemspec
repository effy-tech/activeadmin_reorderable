$:.push File.expand_path("../lib", __FILE__)

require "activeadmin_reorderable/version"

Gem::Specification.new do |s|
  s.name        = "activeadmin_reorderable"
  s.version     = ActiveadminReorderable::VERSION
  s.authors     = ["Effy Tech"]
  s.email       = ["technique@effy.fr"]

  s.summary     = "Drag and drop reordering for ActiveAdmin tables with support for HABTM associations"
  s.description = "Add drag and drop reordering to ActiveAdmin tableswith support for HABTM associations and reloading."

  s.homepage = 'https://github.com/effy-tech/activeadmin_reorderable'
  s.required_ruby_version = Gem::Requirement.new
  s.license = 'Nonstandard'

  s.metadata['allowed_push_host'] = 'https://rubygems.pkg.github.com/effy-tech'
  s.metadata['homepage_uri'] = s.homepage
  s.metadata['source_code_uri'] = 'https://github.com/effy-tech/activeadmin_reorderable'
  s.metadata['changelog_uri'] = 'https://github.com/effy-tech/activeadmin_reorderable'

  s.files = `git ls-files`.split($/)

  s.add_development_dependency 'activeadmin', '~> 0.6'
end

# ActiveAdmin Reorderable

Drag and drop to reorder your ActiveAdmin tables.
(Minor fork by ericpeters0n to accommodate reordering of lists defined under HABTM association.)

![Drag and drop reordering](https://s3.amazonaws.com/kurtzkloud.com/p/activeadmin_reorderable/screenshot.gif)

## Requirements
Your resource classes must respond to `insert_at` ala the [`acts_as_list`](https://github.com/swanandp/acts_as_list) API. You don't need to use `acts_as_list`, but if you don't, make sure to define `insert_at`.

## Installation
- Add `gem 'activeadmin_reorderable'` to `Gemfile`
- Add `#= require activeadmin_reorderable` to `app/assets/javascripts/active_admin.js.coffee`
- Add `@import "activeadmin_reorderable";` as the last `@import` statement in `app/assets/stylesheets/active_admin.css.scss`

If you have models you wish to order within HABTM associations, create the 'order' column in the appropriate join table.
(`acts_as_list` doesn't handle HABTM, so we have to create this migration ourselves.)
`20161122232357_add_order_to_parts_widgets.rb`
```ruby
class AddOrderToPartsWidgets < ActiveRecord::Migration
  def change
    add_column :parts_widgets, :order, :integer
  end
end
```

## Use
`parts.rb`
```ruby
ActiveAdmin.register Part do
  reorderable # Necessary to support reordering in a subtable within Widget below
end
```

`widgets.rb`
```ruby
ActiveAdmin.register Widget do
  config.sort_order = 'position_asc' # assuming Widget.insert_at modifies the `position` attribute
  config.paginate   = false

  reorderable

  actions :index, :show

  # Reorderable Index Table
  index as: :reorderable_table do
    column :id
    column :name
  end

  show do |widget|
    attributes_table do
      row :id
      row :name
    end

    # Reorderable Subtable
    # Note: you must include `reorderable` in the ActiveAdmin configuration for the resource
    # being sorted. See the `Part` example above this code block.
    reorderable_table_for widget.parts do
      column :name
      column :cost
    end

    # Alternately, Reorderable  subtable for HABTM
    reorderable_table_for_habtm widget.parts do
      column :name
      column :cost
    end

  end
end
```

## Gem build and Push on github package

We start this gem following the bundler way to do it. For more information, please read the [relative doc](https://bundler.io/guides/creating_gem.html).

To publish a new package version, developer need to have a minimal configuration and access... as described by the [github official doc about publishing packages](https://docs.github.com/en/packages/guides/configuring-rubygems-for-use-with-github-packages#publishing-a-package).

Please, don't forget to configure your [github credentials shortcut](https://docs.github.com/en/packages/guides/configuring-rubygems-for-use-with-github-packages#authenticating-with-a-personal-access-token) ! :wink:

> you would create or edit a ~/.gem/credentials to include the following, replacing TOKEN with your personal access token.
```bash
---
:github: Bearer TOKEN
```

### Build and Publish

 - 1/ Change version in version.rb
 - 2/ run `bundle` (change actual gem version in Gemfile.lock)
 - 3/ run `gem build` (generate `.gem`)
 - 4/ run `gem push` if ok to publish it on github package. For example, to push _activeadmin_reorderable-0.0.6.gem_:
 ```sh
gem push --key github --host https://rubygems.pkg.github.com/effy-tech activeadmin_reorderable-0.0.6.gem
 ```

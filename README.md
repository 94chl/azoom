# To-do List for Azoom

Simple To-do List web application for Azoom.

It produces some simple function for users.

## Environment

- Nuxt3
- Typescript
- Pinia
- Nuxt UI

## Deploy

It deployed by
<a href="https://94chl.github.io/azoom/" target="_blank">github-page</a>

You can use it without any install or build.

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Functions

### Add

You can add To-do list by click "Add" button.

### Edit

You can edit To-do list by click list title.

If you click list title, edit modal will be opened.

Then you can edit list "Title" and "Content" for detail information.

After end your edit, "Edit date" property update automatically.

### Delete

You can delete To-do list by click "Delete" button.

Before delete list, you should check a checkbox of list you want to delete.

Then you click the "Delete" button, all checked list will be deleted.

### Sort

You can sort To-do list by specific order(ascend or descend)

- Title(default)
- Edit date
- Done

### Flag

You can set "Flag" list for priority order.

If you click "Flag" icon for each list, that list will be replaced in top.

It is not affected by sort.

You can easily remove "Flag" by clicking icon.

### Done

You can set "Done" property for what be finished.

"Done" list will be showed with line-through and gray color.

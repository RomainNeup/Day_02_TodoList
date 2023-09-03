let colors = [
    'text-red-500',
    'text-blue-500',
    'text-green-500',
    'text-yellow-500',
    'text-purple-500',
    'text-pink-500',
    'text-indigo-500',
    'text-gray-500',
    'text-teal-500',
    'text-red-600',
    'text-blue-600',
    'text-green-600',
    'text-yellow-600',
    'text-purple-600',
    'text-pink-600',
    'text-indigo-600',
    'text-gray-600',
    'text-teal-600',
]

document.addEventListener('alpine:init', () => {
    Alpine.store('darkMode', {
        on: false,

        init() {
            this.on = localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
        },

        toggle() {
            this.on = !this.on;
            if (this.on) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    })

    Alpine.store('todos', {
        todos: [],
        categories: [
            { name: 'Work', color: 'text-red-500', selected: false },
            { name: 'Personal', color: 'text-blue-500', selected: false },
            { name: 'Family', color: 'text-green-500', selected: false },
            { name: 'Friends', color: 'text-yellow-500', selected: false },
        ],
        init() {
            let todos = localStorage.getItem('todos') || [];
            let categories = localStorage.getItem('categories');
            try {
                this.todos = JSON.parse(todos) || [];
            } catch {
                this.todos = [];
            }
            this.categories = JSON.parse(categories) || this.categories;
        },
        addTodo(title) {
            if (!title) {
                console.error('Title is required');
                return;
            }
            let category = this.categories.find(c => c.selected).name;
            if (!category) {
                console.error('Category is required');
                return;
            }
            this.todos.push({ title, category, done: false });
            this.save();
        },
        getTodos(done) {
            let category = this.categories.find(c => c.selected)?.name;
            if (!category) {
                return this.todos.filter(todo => done === undefined || todo.done === done);
            }
            return this.todos.filter(todo => todo.category === category && (done === undefined || todo.done === done));
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
            this.save();
        },
        addCategory(name) {
            if (!name) {
                console.error('Name is required');
                return
            };
            let color = colors[this.categories.length % colors.length]
            this.categories.push({ name, color, selected: false });
            this.save();
        },
        removeCategory(index) {
            this.todos = this.todos.filter(todo => todo.category !== this.categories[index].name);
            this.categories.splice(index, 1);
            this.save();
        },
        selectCategory(name) {
            this.categories.forEach(category => {
                if (category.name === name) {
                    category.selected = true;
                } else {
                    category.selected = false;
                }
            });
            this.save();
        },
        toggleDone(index) {
            this.todos.find(todo => todo.id === index).done = !this.todos.find(todo => todo.id === index).done;
            this.save();
        },
        save() {
            let i = 0;
            this.todos.forEach(todo => todo.id = i++);
            i = 0;
            this.categories.forEach(category => category.id = i++);
            localStorage.setItem('todos', JSON.stringify(this.todos));
            localStorage.setItem('categories', JSON.stringify(this.categories));
        }
    })
})
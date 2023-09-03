tailwind.config = {
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        colors: ({ colors }) => ({
            primary: '#5CA4A9',
            secondary: '#9BC1BC',
            light: '#E6EBE0',
            dark: '#303036',
            transparent: colors.transparent,
            white: colors.white,
            red: colors.red,
            blue: colors.blue,
            green: colors.green,
            yellow: colors.yellow,
            purple: colors.purple,
            pink: colors.pink,
            indigo: colors.indigo,
            gray: colors.gray,
            teal: colors.teal,
        })
    },
    darkMode: 'class',
}

if (localStorage.theme === 'dark' || (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
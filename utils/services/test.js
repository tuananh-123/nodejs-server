const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatem quis fuga sit, veniam nisi id officiis incidunt eveniet? Eum totam rerum laborum animi natus maxime quisquam nesciunt voluptatem necessitatibus?"

class Test{
    gennerateText = (content, index, speed) => {
        return new Promise((resolve) => {
            const generate = (content, index) => {
                if (index >= text.length){
                    return resolve(content);
                }
                setTimeout(() => {
                    content += text[index];
                    console.log(index);
                    generate(content, index + 1);
                }, (speed)); 
            }

            generate(content, index); 
        })
        
        
    };
}

module.exports = new Test();
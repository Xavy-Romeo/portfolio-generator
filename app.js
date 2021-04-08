const inquirer = require('inquirer');
const generatePage = require('./src/page-template');
const { writeFile, copyFile } = require('./utils/generate-site.js');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?(Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username: (Required)',
            validate: usernameInput => {
                if (usernameInput) {
                    return true;
                }
                else {
                    console.log('Please enter you GitHub username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => confirmAbout,
            // {
                // if (confirmAbout) {
                //     return true;
                // }
                // else {
                //     return false;
                // }
            // }
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    ===================
     Add a New Project
    ===================
    `);
    
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                }
                else {
                    console.log('Please enter the name of your project!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'projectDescription',
            message: 'Provide a description for the project. (Required)',
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                }
                else {
                    console.log('Please provide a description of the project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'projectGitHubLink',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLink => {
                if (githubLink) {
                    return true;
                }
                else {
                    console.log('Please enter a GitHub link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        }
        else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

    // So let's reiterate the flow this function will now have:

    //     1.  We start by asking the user for their information with Inquirer prompts; 
            // this returns all of the data as an object in a Promise.
    
    //     2.  The promptProject() function captures the returning data from promptUser()
            // and we recursively call promptProject() for as many projects as the user 
            // wants to add. Each project will be pushed into a projects array in the
            // collection of portfolio information, and when we're done, the final set of 
            // data is returned to the next .then().
    
    //     3.  The finished portfolio data object is returned as portfolioData and sent into 
            // the generatePage() function, which will return the finished HTML template code 
            // into pageHTML.
    
    //     4.  We pass pageHTML into the newly created writeFile() function, which returns a 
            // Promise. This is why we use return here, so the Promise is returned into the 
            // next .then() method.
    
    //     5.  Upon a successful file creation, we take the writeFileResponse object provided 
            // by the writeFile() function's resolve() execution to log it, and then we return 
            // copyFile().
    
    //     6.  The Promise returned by copyFile() then lets us know if the CSS file was copied 
            // correctly, and if so, we're all done!
    
    // This is where Promises really provide a benefit to the code readability. Most of what we 
    // had to run to make this project work was some form of asynchronous functionality, so 
    // actually executing it in a way that reads in a step-by-step manner helps make the code 
    // predictable.

    
    
    //     fs.writeFile('./dist/index.html', pageHTML, err => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log('Page created! Check out index.html in this directory to see it!');
        
    //         fs.copyFile('./src/style.css', './dist/style.css', err => {
    //             if (err) {
    //                 console.log(err);
    //                 return;
    //             }
    //             console.log('Style sheet copied successfully!');
    //         });
    //     });
    // });

// const mockData = {
//     name: 'JayJay',
//     github: 'JAYHUB',
//     confirmAbout: true,
//     about:
//       'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//     projects: [
//       {
//         name: 'Run Buddy',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['HTML', 'CSS'],
//         link: 'https://github.com/lernantino/run-buddy',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskinator',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'HTML', 'CSS'],
//         link: 'https://github.com/lernantino/taskinator',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'Taskmaster Pro',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//         languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//         link: 'https://github.com/lernantino/taskmaster-pro',
//         feature: false,
//         confirmAddProject: true
//       },
//       {
//         name: 'Robot Gladiators',
//         description:
//           'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//         languages: ['JavaScript'],
//         link: 'https://github.com/lernantino/robot-gladiators',
//         feature: false,
//         confirmAddProject: false
//       }
//     ]
//   };


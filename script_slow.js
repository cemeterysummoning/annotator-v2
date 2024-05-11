// initialize and get elements from html
let video;
let requested_frames = document.getElementById("specificframe");
let requested_ctx = requested_frames.getContext("2d");
let request_input = document.getElementById("requestframe");
let moveon = document.getElementById("moveon");
let back = document.getElementById("back");
let next = document.getElementById("next");
let imageContainer = document.getElementById("specificframe")

// initial variables and data holders
let current_frame = 0;
// let agents = [{
//     name: "tip",
//     height: 175, 
//     width: 12
// }, {
//     name: "tail",
//     height: 50,
//     width: 12
// }];

let agents = [{
    name: "needlebarb",
    ls: 75, // 5.5 mm
    ws: 12, // 2 mm
    ln: 12, // 2 mm
    wn: 12, // 1 mm
    lt: 12  // 2.5 ~ 3.5 mm
}, {
    name: "needlemodule",
    ls: 75, // 5 mm
    ws: 12, // 2 mm
    lc: 12, // 1 mm
    lb: 12  // 0.5 mm
}];


function generateAgentPointsNew() {
    agent_points = []
    
    let temp = []

    // Agent1 Needle with Barbs --> 9 points

    temp.push([-agents[0]["lt"] - agents[0]["ln"] - agents[0]["ls"]/2, 0])
    temp.push([-agents[0]["ln"] - agents[0]["ls"]/2, agents[0]["wn"]/2])
    temp.push([-agents[0]["ls"]/2, agents[0]["wn"]/2])
    temp.push([-agents[0]["ls"]/2, agents[0]["ws"]/2])
    temp.push([agents[0]["ls"]/2, agents[0]["ws"]/2])
    temp.push([agents[0]["ls"]/2, -agents[0]["ws"]/2])
    temp.push([-agents[0]["ls"]/2, -agents[0]["ws"]/2])
    temp.push([-agents[0]["ls"]/2, agents[0]["wn"]/2])
    temp.push([-agents[0]["ln"] - agents[0]["ls"]/2, agents[0]["wn"]/2])
    agent_points.push(temp)
    // Agent2 Drug Module with magnets inside --> 4 points?
    temp = []
    temp.push([-agents[1]["ls"]/2, agents[1]["ws"]/2])
    temp.push([agents[1]["ls"]/2, agents[1]["ws"]/2])
    temp.push([agents[1]["ls"]/2, -agents[1]["ws"]/2])
    temp.push([-agents[1]["ls"]/2, -agents[1]["ws"]/2])

    //
    agent_points.push(temp)
}


let agent_points = []
let temp = []

    // Agent1 Needle with Barbs --> 9 points

    temp.push([-agents[0]["lt"] - agents[0]["ln"] - agents[0]["ls"]/2, 0])
    temp.push([-agents[0]["ln"] - agents[0]["ls"]/2, agents[0]["wn"]/2])
    temp.push([-agents[0]["ls"]/2, agents[0]["wn"]/2])
    temp.push([-agents[0]["ls"]/2, agents[0]["ws"]/2])
    temp.push([agents[0]["ls"]/2, agents[0]["ws"]/2])
    temp.push([agents[0]["ls"]/2, -agents[0]["ws"]/2])
    temp.push([-agents[0]["ls"]/2, -agents[0]["ws"]/2])
    temp.push([-agents[0]["ls"]/2, agents[0]["wn"]/2])
    temp.push([-agents[0]["ln"] - agents[0]["ls"]/2, agents[0]["wn"]/2])
    agent_points.push(temp)
    // Agent2 Drug Module with magnets inside --> 4 points?
    temp = []
    temp.push([-agents[1]["ls"]/2, agents[1]["ws"]/2])
    temp.push([agents[1]["ls"]/2, agents[1]["ws"]/2])
    temp.push([agents[1]["ls"]/2, -agents[1]["ws"]/2])
    temp.push([-agents[1]["ls"]/2, -agents[1]["ws"]/2])

    //
    agent_points.push(temp)
// generateAgentPointsNew()
// for (let i = 0; i < agents.length; i++) {
//     let temp = []

//     temp.push([-agents[i]["width"] / 2, -agents[i]["height"] / 2])
//     temp.push([agents[i]["width"] / 2, -agents[i]["height"] / 2])
//     temp.push([agents[i]["width"] / 2, agents[i]["height"] / 2])
//     temp.push([-agents[i]["width"] / 2, agents[i]["height"] / 2])

//     agent_points.push(temp)
// }

function generateAgentPoints() {
    agent_points = []
    for (let i = 0; i < agents.length; i++) {
        let temp = []
    
        temp.push([-agents[i]["width"] / 2, -agents[i]["height"] / 2])
        temp.push([agents[i]["width"] / 2, -agents[i]["height"] / 2])
        temp.push([agents[i]["width"] / 2, agents[i]["height"] / 2])
        temp.push([-agents[i]["width"] / 2, agents[i]["height"] / 2])
    
        agent_points.push(temp)
    }
}

// Function added for new agent1 template

/* Agent 1 shape

                    ---------
                    |          |
                    



*/

let focused_agent = 0;
let radius;
let center;
let colors = ["#74ee15", "#34d2eb", "#159ca1", "#f0823e"]
let final_data = []
let frames = [];
let current_point = 0;
let current_agent = 0;
let framerate = 1;
let filename;
let video_dim;
let returning;

// stinger agent: 
    // height: 75 px
    // width: 12 px

// other agent: 50 px by 12 px


function getRandomColor() {
    let h = Math.floor(Math.random() * 360);
    let s = Math.floor(Math.random() * 80) + 20;
    let l = Math.floor(Math.random() * 70) + 10;
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function returningsubmit() {
    let file_json = document.getElementById("json").files;
    video = document.getElementById("video");
    let input = document.getElementById("file");
    returning = true
    if (file_json.length != 0) {
        
        let fileRead = new FileReader();
        fileRead.onload = function(e) {
            let content = e.target.result;
            let intern = JSON.parse(content);
            console.log(intern);
            final_data = intern.data;
            colors = intern.frameColors;
            filename = intern.name;
            agents = intern.agents;
            agent_nums = agents.length;
            console.log(agents);
            console.log(intern.agentPoints);
            console.log(final_data)
            agent_points = intern.agentPoints;
            framerate = intern.frameRate
        }

        document.getElementById("video").src = URL.createObjectURL(input.files[0]);
        fileRead.readAsText(file_json[0])
        document.getElementById("collection").style.display = "block";
        document.getElementById("upload").style.display = "none"

        init();
    } else {
        alert("Must choose a file for previous data dump")
    }
}

function newsubmit() {
    returning = false
    document.getElementById("upload").style.display = "none"
    
    video = document.getElementById("video");
    let input = document.getElementById("file");
    if (input.files.length == 0) {
        alert("Must upload a file")
    } else {
        document.getElementById("collection").style.display = "block";
        document.getElementById("video").src = URL.createObjectURL(input.files[0]);
        filename = input.value.split("\\").pop()

        init();
    }
}

function init() {
    video = document.getElementById("video");
    VideoToFrames.getFrames(video.src, framerate, VideoToFramesMethod.fps).then(function(frames_data) {
        console.log("here")
        frames_data.forEach(function (frame) {
            frames.push(frame);
        });
        console.log(frames);
        let label = document.getElementById("header")
        label.textContent = "Frames gathered, total frames: " + frames.length;
        moveon.style.display = "block";
        request_input.min = 0;
        request_input.max = frames.length;
        request_input.value = current_frame;
        requested_frames.width = frames[0].width
        requested_frames.height = frames[0].height
        video_dim = [frames[0].width, frames[0].height]

            // doing array.fill fills the array with the rereference to something, not a copy of the value
            // agent_points = Array(frames.length).fill(Array(agent_nums * 2).fill([0, 0]))
        
        document.getElementById("pointIndicator").innerText = `Choosing: ${agents[current_agent].name}`
        
        if (final_data.length != frames.length) {

            for (let i = final_data.length; i < frames.length; i++) {
                let temp_obj = {}
                for (let j = 0; j < agents.length; j++) {
                    let name = agents[j].name
                    // [coordinates, angle]
                    temp_obj[name] = {
                        coords: [0, 0],
                        angle: 0
                    }
                }
                final_data.push({
                    frame: i,
                    location: temp_obj
                })
            }

        }
        if (!returning) {
            final_data[0]["location"]["tip"] = {
                coords: [frames[0].width / 2, frames[0].height/ 2],
                angle: 0
            }
            final_data[0]["location"]["tail"] = {
                coords: [frames[0].width / 2, frames[0].height / 2],
                angle: 0
            }
        }
        

        console.log(final_data);
        put_image(0);
        console.log("processeed")
    })
}

request_input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        current_frame = parseInt(request_input.value)
        put_image(current_frame);
    }
})

moveon.addEventListener("click", function() {
    document.getElementById("annotate").style.display = "block"
    document.getElementById("collection").style.display = "none"
})

function next_frame() {
    current_frame = parseInt(request_input.value) + 1
    current_agent = 0;
    resetChoice();
    if (current_frame >= frames.length) {
        alert("No more frames left");
    } else {
        request_input.value = current_frame
        put_image(current_frame)
    }
}

function back_frame() {
    current_agent = 0;
    current_frame = parseInt(request_input.value) - 1
    resetChoice();
    if (current_frame < 0) {
        alert("No more frames left");
        current_frame = 0;
    } else {
        request_input.value = current_frame
        put_image(current_frame)
    }
}

back.addEventListener("click", function() {
    back_frame();
})

next.addEventListener("click", function() {
    next_frame()
})

document.addEventListener('keydown', (event) => {
    
    if (event.code === "Space") {
        event.preventDefault();
        next_frame()
    } else if (event.code === "KeyB") {
        back_frame()
    } else if (event.code === "KeyZ") {
        let prevPoints = final_data[current_frame - 1].coords;
        for (i = 0; i < prevPoints.length; i++) {
            final_data[current_frame].coords[i] = [...prevPoints[i]]
        }
        put_image(current_frame)
    }
})
function matrix_vec_mult(matrix, vec) {
    let resulting_vec = []
    for (let i = 0; i < matrix.length; i++) {
        let quantity = 0;
        for (let j = 0;  j < matrix.length; j++) {
            quantity += matrix[i][j] * vec[j]
        }
        resulting_vec.push(quantity)
    }
    return resulting_vec
}
function mm_to_px(length) {
    const px_to_mm_ratio = 424 / 19
    return length * px_to_mm_ratio
}

function computeRecPoints(p, theta, cur_agent) {
    let rec_points = []
    let transformation_matrix = [
        [Math.cos(theta), - Math.sin(theta), p[0]],
        [Math.sin(theta), Math.cos(theta), p[1]],
        [0, 0, 1]
    ]
    let pts = agent_points[cur_agent]
    for (let i = 0; i < pts.length; i++) {
        let temp = matrix_vec_mult(transformation_matrix, [...pts[i], 1])
        temp[1] = temp[1] < 0 ? temp[1] *= -1 : temp[1]
        rec_points.push(temp)
    }
    return rec_points
}

function put_image(index) {
    requested_ctx.clearRect(0, 0, requested_frames.width, requested_frames.height);
    requested_ctx.reset()
    requested_ctx.putImageData(frames[index], 0, 0);
    for (let i = 0; i < agents.length; i++) {
        requested_ctx.strokeStyle = colors[i]
        let temp_data = final_data[index].location[agents[i].name]
        let pts = computeRecPoints(temp_data["coords"], temp_data["angle"], i)
        requested_ctx.beginPath()
        requested_ctx.moveTo(...pts[0])
        for (let j = 1; j < pts.length; j++) {
            requested_ctx.lineTo(...pts[j])
            requested_ctx.moveTo(...pts[j])
        }
        requested_ctx.lineTo(...pts[0])
        requested_ctx.stroke()
        requested_ctx.closePath()
    }

}

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    console.log(`Frame: ${current_frame}
                Coordinate x: ${x}
                Coordinate y: ${y}`);
    
    document.getElementById("pointIndicator").innerText = `Choosing: ${agents[current_agent].name}`

}


requested_frames.addEventListener("click", function(event) {
    getMousePosition(requested_frames, event);
})


window.addEventListener('keydown', event => {
    if (event.code === "KeyR") {
        current_agent = (current_agent + 1) % agents.length
        document.getElementById("pointIndicator").innerText = `Choosing: ${agents[current_agent].name}`
        console.log(`Choosing: ${agents[current_agent].name}`) 
    } else if (event.code === "KeyW") {
        for (let i = 0; i < agents.length; i++) {
            let prev_coords = [...final_data[current_frame - 1]["location"][agents[i].name]["coords"]]
            let prev_angle = final_data[current_frame - 1]["location"][agents[i].name]["angle"]
            final_data[current_frame]["location"][agents[i].name] = {
                coords: prev_coords,
                angle: prev_angle
            }
        }
        put_image(current_frame)
    }
})
let shiftOn = false
let altOn = false
window.addEventListener('keydown', event => {
    if (event.code === "ArrowUp") {
        if (shiftOn) {
            agents[current_agent].ls++
            generateAgentPointsNew()
            console.log("here")
            put_image(current_frame)
        } else {
            requested_ctx.clearRect(0, 0, requested_frames.width, requested_frames.height);
            event.preventDefault();
            final_data[current_frame]["location"][agents[current_agent].name]["coords"][1] -= altOn ? 3 : 1
            put_image(current_frame)
        }
    } else if (event.code === "ArrowDown") {
        if (shiftOn) {
            agents[current_agent].ls--
            generateAgentPointsNew()
            put_image(current_frame)

        } else {
            requested_ctx.clearRect(0, 0, requested_frames.width, requested_frames.height);
            event.preventDefault()
            final_data[current_frame]["location"][agents[current_agent].name]["coords"][1] += altOn ? 3 : 1
            put_image(current_frame)
        }
    } else if (event.code === "ArrowLeft") {
        if (shiftOn) {
            agents[current_agent].ws--
            generateAgentPointsNew()
            put_image(current_frame)

        } else {
            requested_ctx.clearRect(0, 0, requested_frames.width, requested_frames.height);
            event.preventDefault()
            final_data[current_frame]["location"][agents[current_agent].name]["coords"][0] -= altOn ? 3 : 1
            put_image(current_frame)
        }
    } else if (event.code === "ArrowRight") {
        if (shiftOn) {
            agents[current_agent].ws++
            generateAgentPointsNew()
            put_image(current_frame)

        } else {
            requested_ctx.clearRect(0, 0, requested_frames.width, requested_frames.height);
            event.preventDefault()
            final_data[current_frame]["location"][agents[current_agent].name]["coords"][0] += altOn ? 3 : 1
            put_image(current_frame)
        }
        
    } else if (event.code === "KeyA") {
        requested_ctx.clearRect(0, 0, requested_frames.width, requested_frames.height);
        event.preventDefault()
        final_data[current_frame]["location"][agents[current_agent].name]["angle"] -= altOn ? 0.03 : 0.01
        put_image(current_frame)
    } else if (event.code === "KeyD") {
        requested_ctx.clearRect(0, 0, requested_frames.width, requested_frames.height);
        event.preventDefault()
        final_data[current_frame]["location"][agents[current_agent].name]["angle"] += altOn ? 0.03 : 0.01
        put_image(current_frame)
    }
})

window.addEventListener('keydown', event => {
    if (event.key === "Shift") {
        shiftOn = true
    } 
    if (event.key === "Alt") {
        altOn = true
    }
})

window.addEventListener('keyup', event => {
    if (event.key === "Shift") {
        shiftOn = false
    } 
    if (event.key === "Alt") {
        altOn = false
    }
})

// these are fine
function exportJson(link) {
    let final_obj = {
        name: filename,
        dimension: video_dim,
        frameRate: framerate,
        frameColors: colors,
        agents: agents,
        data: final_data,
        agentPoints: agent_points
    }
    let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(final_obj));
    link.setAttribute("href", "data:" + data);
    link.setAttribute("download", "data.json");
}

function switchInputType() {
    let newStyle = document.getElementById("new")
    let returningStyle = document.getElementById("returning")

    if (newStyle.style.display == "block") {
        newStyle.style.display = "none";
        returningStyle.style.display = "block"
        document.getElementById("headerlabel").text = "Upload existing data"
    } else if (newStyle.style.display == "none") {
        newStyle.style.display = "block";
        returningStyle.style.display = "none"
        document.getElementById("headerlabel").text = "Upload new video"
    }
}

function resetChoice() {
    focused_agent = 0;
    current_agent = 0;
    document.getElementById("pointIndicator").innerText = `Choosing: ${agents[current_agent].agent_name}`;
}

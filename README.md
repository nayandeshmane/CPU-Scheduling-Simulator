# CPU Scheduling Simulator Project - Frontend

## Overview

This repository contains the frontend implementation for a CPU Scheduling Algorithm Simulator Project, aiming to provide an interactive visualization of various CPU scheduling algorithms commonly used in operating systems.

## Theory

### CPU Scheduling Algorithms

In the realm of operating systems, CPU scheduling is a critical task responsible for determining the order in which processes are executed by the CPU. The following algorithms are visualized in this project:

1. **First-Come, First-Served (FCFS)**
   - FCFS is the simplest scheduling algorithm, where processes are executed in the order they arrive in the ready queue. It suffers from the "convoy effect" and may lead to poor turnaround times.

2. **Shortest Job Next (SJN) / Shortest Job First (SJF)**
   - SJN aims to minimize the total processing time by selecting the process with the shortest burst time first. This algorithm can lead to optimal average turnaround time but requires knowledge of the burst times in advance.

3. **Round Robin (RR)**
   - RR is a preemptive scheduling algorithm where each process is assigned a fixed time slice or quantum. If a process's burst time exceeds the quantum, it is moved to the back of the queue, allowing other processes to execute.

4. **Priority Scheduling**
   - Priority Scheduling assigns priorities to processes, and the process with the highest priority is selected for execution. This can lead to potential starvation of low-priority processes.

### Features

- **Visualization**: Interactive charts and diagrams provide a real-time representation of CPU scheduling algorithms in action.
- **User Input**: Users can input process details, including arrival times and burst times, to observe the impact on different scheduling algorithms.
- **Real-Time Updates**: Dynamic updates showcase the progress of CPU scheduling algorithms during execution, aiding in understanding their behavior.

## Technologies Used

- HTML
- CSS
- JavaScript

## Getting Started

Follow these instructions to get the project up and running on your local machine.

1. Clone the repository:

    ```bash
    https://github.com/gajendra-ingle/Frontend-Final-year-project.git
    
2. Open `index.html` in your browser.

<hr>

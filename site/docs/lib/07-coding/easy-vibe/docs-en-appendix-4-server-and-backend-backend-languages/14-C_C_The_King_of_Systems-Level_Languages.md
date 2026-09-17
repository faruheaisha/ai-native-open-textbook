---
title: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceId: "07-coding/easy-vibe"
sourceTitle: "Easy-Vibe（Datawhale：从零做出真实产品）"
sourceKind: "课时教程"
licenseLabel: "限非商用"
lang: "中英混排"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/datawhalechina/easy-vibe"
entryUrl: "https://github.com/datawhalechina/easy-vibe/blob/130e9b75b28b524e8cc74e615fd9733a4e2b330d/docs/en/appendix/4-server-and-backend/backend-languages.md"
sourceRel: "docs/en/appendix/4-server-and-backend/backend-languages.md"
rawUrl: "/raw/07-coding/easy-vibe/docs/en/appendix/4-server-and-backend/backend-languages.md"
sourceSha256: "dfd24d8f9c841bb8f093ec712323f0c829b50370091ad4698b7d0f07c21c0268"
pageSha256: "dbe78024f42e56af138344a7556cfef4893020962f05c4a1d37ef573ac73f1fe"
contentMode: "local-full"
zh: ""
---

## C / C++: The King of Systems-Level Languages

**Positioning**: Performance supreme · Embedded/OS/Engines/Audio-Video · Systems programming cornerstone

### 10 Major Application Directions for C/C++

| Application Direction | Subcategory Examples & Description | Typical Applications / Programs |
| :--- | :--- | :--- |
| **OS Kernel Development** | Writing Linux kernel modules (custom filesystems, network protocol stacks); developing RTOS based on FreeRTOS/RT-Thread; Windows/Linux device drivers (USB/graphics drivers); xv6-like teaching OS for learning kernel principles | Linux Kernel<br>Windows NT<br>FreeRTOS<br>RT-Thread<br>Zephyr OS<br>xv6 |
| **Embedded Systems Development** | STM32 firmware development (sensors, motors, industrial instruments); Arduino hardware projects (smart cars, environmental monitoring); ESP32 IoT firmware (Wi-Fi/MQTT/OTA); FPGA upper-layer control; Raspberry Pi low-level GPIO | STM32CubeIDE projects<br>Arduino IDE projects<br>ESP-IDF projects<br>PlatformIO projects<br>Keil MDK projects |
| **Host-Device Communication Development** | Qt serial debugging tools (communicating with STM32/PLC); Modbus RTU/TCP protocol integration; CAN bus automotive electronic ECU communication; SCADA industrial monitoring systems | VOFA+ serial debugging tool<br>MCGS touchscreen programs<br>KingView<br>WinCC |
| **Cross-Platform Desktop Applications** | Qt/QML cross-platform desktop GUI; MFC Windows tools; GTK+ Linux desktop apps; ImGui in-game tools/editors | WPS Office<br>VirtualBox<br>OBS Studio<br>Telegram Desktop<br>KDE suite<br>GIMP |
| **Game Engines & Game Development** | Unreal Engine 5 game development; custom 2D/3D engines; OpenGL/Vulkan/DirectX graphics programming; game server backends | UE5 Blueprint+C++ projects<br>DOOM engine<br>id Tech<br>CryEngine<br>Cocos2d-x |
| **Audio/Video & Streaming Media** | FFmpeg transcoding/encoding; WebRTC C++ layer real-time communication; live streaming push/pull SDKs; VST audio plugins; video surveillance NVR | FFmpeg<br>OBS Studio<br>VLC<br>WebRTC Native<br>SRS streaming server |
| **Databases & Storage Engines** | Custom KV storage engines; MySQL storage engine plugins; Redis Module extensions; distributed filesystem modules | LevelDB<br>RocksDB<br>MySQL InnoDB<br>Redis<br>SQLite<br>TiKV |
| **Compilers & Language Tools** | Custom language lexer/parser (LLVM backend); DSL compilers; static code analysis; JIT compilers | LLVM/Clang<br>GCC<br>V8 engine<br>JavaScriptCore<br>MSVC |
| **High-Performance Computing** | CUDA GPU parallel computing (deep learning inference acceleration); OpenMP/MPI multi-core parallelism; fluid/molecular simulation; quantitative trading low-latency systems | CUDA Toolkit<br>TensorRT<br>OpenFOAM<br>GROMACS<br>QuantLib |
| **Network Security & Reverse Engineering** | Network packet capture and analysis; penetration testing tools; binary reverse engineering; antivirus engines; encryption/decryption libraries | Wireshark<br>Nmap<br>IDA Pro plugins<br>Ghidra modules<br>OpenSSL |

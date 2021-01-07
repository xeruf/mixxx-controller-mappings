// Native Instruments Traktor Kontrol F1 HID interface specification
function KontrolF1Controller() {
    this.controller = new HIDController()
    this.controller.softTakeoverAll()
    this.controller.activeDeck = channel

    this.buttonNames = [
        'quant', 'capture', 'shift',
        'reverse', 'type', 'size',
        'play_1_1', 'play_1_2', 'play_2_1', 'play_2_2',
        'play_3_1', 'play_3_2', 'play_4_1', 'play_4_2'
    ]

    this.registerInputPackets = function () {
        var packet = new HIDPacket('control', 0x1)
        
        // Grid
        packet.addControl('hid', 'grid_8', 1, 'I', 0x1)
        packet.addControl('hid', 'grid_7', 1, 'I', 0x2)
        packet.addControl('hid', 'grid_6', 1, 'I', 0x4)
        packet.addControl('hid', 'grid_5', 1, 'I', 0x8)
        packet.addControl('hid', 'grid_4', 1, 'I', 0x10)
        packet.addControl('hid', 'grid_3', 1, 'I', 0x20)
        packet.addControl('hid', 'grid_2', 1, 'I', 0x40)
        packet.addControl('hid', 'grid_1', 1, 'I', 0x80)
        packet.addControl('hid', 'grid_16', 1, 'I', 0x100)
        packet.addControl('hid', 'grid_15', 1, 'I', 0x200)
        packet.addControl('hid', 'grid_14', 1, 'I', 0x400)
        packet.addControl('hid', 'grid_13', 1, 'I', 0x800)
        packet.addControl('hid', 'grid_12', 1, 'I', 0x1000)
        packet.addControl('hid', 'grid_11', 1, 'I', 0x2000)
        packet.addControl('hid', 'grid_10', 1, 'I', 0x4000)
        packet.addControl('hid', 'grid_9', 1, 'I', 0x8000)
        
        // Buttons below scroll knob & scroll knob push
        packet.addControl('hid', 'shift', 1, 'I', 0x800000)
        packet.addControl('hid', 'reverse', 1, 'I', 0x400000)
        packet.addControl('hid', 'size', 1, 'I', 0x100000)
        packet.addControl('hid', 'type', 1, 'I', 0x200000)
        packet.addControl('hid', 'select_push', 1, 'I', 0x40000)
        packet.addControl('hid', 'browse', 1, 'I', 0x80000)
        
        // Buttons below Grid
        packet.addControl('hid', 'play_1', 1, 'I', 0x80000000)
        packet.addControl('hid', 'play_2', 1, 'I', 0x40000000)
        packet.addControl('hid', 'play_3', 1, 'I', 0x20000000)
        packet.addControl('hid', 'play_4', 1, 'I', 0x10000000)
        
        // Buttons next to scroll knob & scroll knob scrolling
        packet.addControl('hid', 'sync', 1, 'I', 0x8000000)
        packet.addControl('hid', 'quant', 1, 'I', 0x4000000)
        packet.addControl('hid', 'capture', 1, 'I', 0x2000000)
        packet.addControl('hid', 'select_encoder', 5, 'B', undefined, true)

        // Knobs have value range 0-4092, so while some controls are
        // -1..0..1 range, hidparser will return same data as with h
        // packing (16 bit range while we only use 12 bits)
        packet.addControl('hid', 'knob_1', 6, 'H')
        packet.addControl('hid', 'knob_2', 8, 'H')
        packet.addControl('hid', 'knob_3', 10, 'H')
        packet.addControl('hid', 'knob_4', 12, 'H')
        packet.addControl('hid', 'fader_1', 14, 'H')
        packet.addControl('hid', 'fader_2', 16, 'H')
        packet.addControl('hid', 'fader_3', 18, 'H')
        packet.addControl('hid', 'fader_4', 20, 'H')
        
        this.controller.registerInputPacket(packet)
    }

    this.registerOutputPackets = function () {
        var packet = new HIDPacket('lights', 0x80)

        // Right 7-segment element
        packet.addOutput('hid', 'right_segment_dp', 1, 'B')
        packet.addOutput('hid', 'right_segment_1', 2, 'B')
        packet.addOutput('hid', 'right_segment_2', 3, 'B')
        packet.addOutput('hid', 'right_segment_3', 4, 'B')
        packet.addOutput('hid', 'right_segment_4', 5, 'B')
        packet.addOutput('hid', 'right_segment_5', 6, 'B')
        packet.addOutput('hid', 'right_segment_6', 7, 'B')
        packet.addOutput('hid', 'right_segment_7', 8, 'B')

        // Left 7-segment element
        packet.addOutput('hid', 'left_segment_dp', 9, 'B')
        packet.addOutput('hid', 'left_segment_1', 10, 'B')
        packet.addOutput('hid', 'left_segment_2', 11, 'B')
        packet.addOutput('hid', 'left_segment_3', 12, 'B')
        packet.addOutput('hid', 'left_segment_4', 13, 'B')
        packet.addOutput('hid', 'left_segment_5', 14, 'B')
        packet.addOutput('hid', 'left_segment_6', 15, 'B')
        packet.addOutput('hid', 'left_segment_7', 16, 'B')

        // Button led brightness, 0-0x7f
        packet.addOutput('hid', 'browse_brightness', 17, 'B')
        packet.addOutput('hid', 'size_brightness', 18, 'B')
        packet.addOutput('hid', 'type_brightness', 19, 'B')
        packet.addOutput('hid', 'reverse_brightness', 20, 'B')
        packet.addOutput('hid', 'shift_brightness', 21, 'B')
        packet.addOutput('hid', 'capture_brightness', 22, 'B')
        packet.addOutput('hid', 'quant_brightness', 23, 'B')
        packet.addOutput('hid', 'sync_brightness', 24, 'B')

        // Pad RGB color button controls, 3 bytes per pad
        packet.addOutput('hid', 'grid_1_blue', 25, 'B')
        packet.addOutput('hid', 'grid_1_red', 26, 'B')
        packet.addOutput('hid', 'grid_1_green', 27, 'B')
        packet.addOutput('hid', 'grid_2_blue', 28, 'B')
        packet.addOutput('hid', 'grid_2_red', 29, 'B')
        packet.addOutput('hid', 'grid_2_green', 30, 'B')
        packet.addOutput('hid', 'grid_3_blue', 31, 'B')
        packet.addOutput('hid', 'grid_3_red', 32, 'B')
        packet.addOutput('hid', 'grid_3_green', 33, 'B')
        packet.addOutput('hid', 'grid_4_blue', 34, 'B')
        packet.addOutput('hid', 'grid_4_red', 35, 'B')
        packet.addOutput('hid', 'grid_4_green', 36, 'B')
        packet.addOutput('hid', 'grid_5_blue', 37, 'B')
        packet.addOutput('hid', 'grid_5_red', 38, 'B')
        packet.addOutput('hid', 'grid_5_green', 39, 'B')
        packet.addOutput('hid', 'grid_6_blue', 40, 'B')
        packet.addOutput('hid', 'grid_6_red', 41, 'B')
        packet.addOutput('hid', 'grid_6_green', 42, 'B')
        packet.addOutput('hid', 'grid_7_blue', 43, 'B')
        packet.addOutput('hid', 'grid_7_red', 44, 'B')
        packet.addOutput('hid', 'grid_7_green', 45, 'B')
        packet.addOutput('hid', 'grid_8_blue', 46, 'B')
        packet.addOutput('hid', 'grid_8_red', 47, 'B')
        packet.addOutput('hid', 'grid_8_green', 48, 'B')
        packet.addOutput('hid', 'grid_9_blue', 49, 'B')
        packet.addOutput('hid', 'grid_9_red', 50, 'B')
        packet.addOutput('hid', 'grid_9_green', 51, 'B')
        packet.addOutput('hid', 'grid_10_blue', 52, 'B')
        packet.addOutput('hid', 'grid_10_red', 53, 'B')
        packet.addOutput('hid', 'grid_10_green', 54, 'B')
        packet.addOutput('hid', 'grid_11_blue', 55, 'B')
        packet.addOutput('hid', 'grid_11_red', 56, 'B')
        packet.addOutput('hid', 'grid_11_green', 57, 'B')
        packet.addOutput('hid', 'grid_12_blue', 58, 'B')
        packet.addOutput('hid', 'grid_12_red', 59, 'B')
        packet.addOutput('hid', 'grid_12_green', 60, 'B')
        packet.addOutput('hid', 'grid_13_blue', 61, 'B')
        packet.addOutput('hid', 'grid_13_red', 62, 'B')
        packet.addOutput('hid', 'grid_13_green', 63, 'B')
        packet.addOutput('hid', 'grid_14_blue', 64, 'B')
        packet.addOutput('hid', 'grid_14_red', 65, 'B')
        packet.addOutput('hid', 'grid_14_green', 66, 'B')
        packet.addOutput('hid', 'grid_15_blue', 67, 'B')
        packet.addOutput('hid', 'grid_15_red', 68, 'B')
        packet.addOutput('hid', 'grid_15_green', 69, 'B')
        packet.addOutput('hid', 'grid_16_blue', 70, 'B')
        packet.addOutput('hid', 'grid_16_red', 71, 'B')
        packet.addOutput('hid', 'grid_16_green', 72, 'B')

        // Play key brightness control, 0-0x7f
        packet.addOutput('hid', 'play_4_1_brightness', 73, 'B')
        packet.addOutput('hid', 'play_4_2_brightness', 74, 'B')
        packet.addOutput('hid', 'play_3_1_brightness', 75, 'B')
        packet.addOutput('hid', 'play_3_2_brightness', 76, 'B')
        packet.addOutput('hid', 'play_2_1_brightness', 77, 'B')
        packet.addOutput('hid', 'play_2_2_brightness', 78, 'B')
        packet.addOutput('hid', 'play_1_1_brightness', 79, 'B')
        packet.addOutput('hid', 'play_1_2_brightness', 80, 'B')

        this.controller.registerOutputPacket(packet)
    }

    // Set brightness for single color buttons with brightness adjustment
    // Valid adjustment range is 0-0x7f
    this.setButtonBrightness = function (name, value) {
        var packet = this.controller.getLightsPacket()
        if (name.match(/grid_/)) {
            HIDDebug('ERROR: set PAD colors with setPADColor')
            return
        }
        if (!name.match(/.*_brightness$/))
            name = name + '_brightness'
        var field = packet.getField('hid', name)
        if (field === undefined) {
            HIDDebug('button field not found: ' + name)
            return
        }
        if (value < 0)
            value = 0
        if (value > 0x7f)
            value = 0x7f
        field.value = value
    }

    this.set7SegmentNumber = function (number) {
        var controller = this.controller
        var packet = controller.getLightsPacket()
        if (number !== undefined) {
            left = KontrolF1.segments[Math.floor(number / 10)]
            right = KontrolF1.segments[number % 10]
        } else {
            left = KontrolF1.segments['empty']
            right = KontrolF1.segments['empty']
        }

        for (var i = 0; i < 7; i++) {
            field = packet.getField('hid', 'left_segment_' + (i + 1))
            field.value = left[i]
            field = packet.getField('hid', 'right_segment_' + (i + 1))
            field.value = right[i]
        }
        //HIDDebug('segments left ' + left + ' right ' + right)
    }

    // Set the 8 bytes in left or right 7-segment display. DP is the dot.
    this.set7SegmentValue = function (name, dp, v1, v2, v3, v4, v5, v6, v7) {
        var packet = this.controller.getLightsPacket()
        packet.getField('hid', name + '_segment_dp').value = dp
        packet.getField('hid', name + '_segment_1').value = v1
        packet.getField('hid', name + '_segment_2').value = v2
        packet.getField('hid', name + '_segment_3').value = v3
        packet.getField('hid', name + '_segment_4').value = v4
        packet.getField('hid', name + '_segment_5').value = v5
        packet.getField('hid', name + '_segment_6').value = v6
        packet.getField('hid', name + '_segment_7').value = v7
    }

    // Set RGB color for one of the 16 pads.
    // Index is pad number index as 1-16.
    // Valid range for each color is 0-0x7f.
    this.setPADColor = function (index, red, green, blue) {
        var packet = this.controller.getLightsPacket()
        var field
        if (index <= 0 || index > 16) {
            HIDDebug('Invalid grid index' + index)
            return
        }
        if (red === undefined)
            red = 0
        if (red > 0x7f)
            red = 0x7f
        field = packet.getField('hid', 'grid_' + index + '_red')
        field.value = red
        if (green === undefined)
            green = 0
        if (green > 0x7f)
            green = 0x7f
        field = packet.getField('hid', 'grid_' + index + '_green')
        field.value = green
        if (blue === undefined)
            blue = 0
        if (blue > 0x7f)
            blue = 0x7f
        field = packet.getField('hid', 'grid_' + index + '_blue')
        field.value = blue
    }

}

KontrolF1 = new KontrolF1Controller()

KontrolF1.init = function (id) {
    KontrolF1.id = id

    KontrolF1.controlModeButtons = {'decks': 'capture', 'samplers': 'quant'}
    KontrolF1.defaultControlMode = 'decks'

    KontrolF1.registerInputPackets()
    KontrolF1.registerOutputPackets()

    var controller = KontrolF1.controller
    controller.getLightsPacket().clearControls()

    KontrolF1.knobs = {}
    KontrolF1.faders = {}
    KontrolF1.grids = {}
    KontrolF1.playbuttons = {}
    KontrolF1.segments = {}

    controller.postProcessDelta = KontrolF1.ButtonLEDPressUpdate

    KontrolF1.registerCallbacks()

    KontrolF1.setControlMode(KontrolF1.defaultControlMode)

    // Timers can't be defined in prototype with this.
    if (KontrolF1.LEDUpdateInterval !== undefined) {
        KontrolF1.LEDTimer = engine.beginTimer(
            KontrolF1.LEDUpdateInterval,
            'KontrolF1.controller.sendLightsUpdate()'
        )
    }
    KontrolF1.segments['empty'] = [0, 0, 0, 0, 0, 0, 0]
    KontrolF1.segments[0] = [0x00, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f]
    KontrolF1.segments[1] = [0x00, 0x7f, 0x7f, 0x00, 0x00, 0x00, 0x00]
    KontrolF1.segments[2] = [0x7f, 0x00, 0x7f, 0x7f, 0x00, 0x7f, 0x7f]
    KontrolF1.segments[3] = [0x7f, 0x7f, 0x7f, 0x7f, 0x00, 0x00, 0x7f]
    KontrolF1.segments[4] = [0x7f, 0x7f, 0x7f, 0x00, 0x7f, 0x00, 0x00]
    KontrolF1.segments[5] = [0x7f, 0x7f, 0x00, 0x7f, 0x7f, 0x00, 0x7f]
    KontrolF1.segments[6] = [0x7f, 0x7f, 0x00, 0x7f, 0x7f, 0x7f, 0x7f]
    KontrolF1.segments[7] = [0x00, 0x7f, 0x7f, 0x7f, 0x00, 0x00, 0x00]
    KontrolF1.segments[8] = [0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x7f]
    KontrolF1.segments[9] = [0x7f, 0x7f, 0x7f, 0x7f, 0x7f, 0x00, 0x7f]

    KontrolF1.testUpdateInterval = undefined
    KontrolF1.testSegment = 0
    if (KontrolF1.testUpdateInterval !== undefined)
        KontrolF1.testTimer = engine.beginTimer(
            KontrolF1.testUpdateInterval,
            'KontrolF1.testSegments()'
        )

    KontrolF1.extrabuttonlights = {
        'sync': {
            'group': '[Channel' + channel + ']',
            'name': 'sync_enabled',
            'getVal': function () {
                return engine.getValue('[Channel' + channel + ']', 'sync_enabled') > 0 ? 0x7f : 0
            }
        }
    }
    const extrabuttons = KontrolF1.extrabuttonlights
    for (var name in extrabuttons) {
        const buttonLight = extrabuttons[name]
        KontrolF1.setButtonBrightness(name, buttonLight.getVal())
        engine.connectControl(buttonLight.group, buttonLight.name, function () {
            KontrolF1.setButtonBrightness(name, buttonLight.getVal())
            KontrolF1.controller.sendLightsUpdate()
        })
    }

    KontrolF1.controller.sendLightsUpdate()
    HIDDebug('NI Traktor F1 ' + KontrolF1.id + ' initialized')
}

KontrolF1.testSegments = function () {
    if (KontrolF1.testSegment < 100) {
        KontrolF1.set7SegmentNumber(KontrolF1.testSegment)
        KontrolF1.testSegment += 1
    } else {
        engine.stopTimer(KontrolF1.testTimer)
        KontrolF1.set7SegmentNumber(undefined)
    }
    KontrolF1.controller.sendLightsUpdate()
}

// Device cleanup function
KontrolF1.shutdown = function () {
    KontrolF1.controller.getLightsPacket().clearControls()
    HIDDebug('NI Traktor F1 ' + KontrolF1.id + ' shut down')
}

// Mandatory default handler for incoming packets
KontrolF1.incomingData = function (data, length) {
    KontrolF1.controller.parsePacket(data, length)
}

// Mandatory LED update callback handler
KontrolF1.activeLEDUpdateWrapper = function () {
    KontrolF1.controller.updateActiveDeckLEDs()
}

// Handle button LED updates after packet receive if required:
// F1 will reset LEDs to a default state without this
// Registered as packet post processing callback in init.
KontrolF1.ButtonLEDPressUpdate = function (packet, changed_data) {
    var send_led_update = false
    for (var field in changed_data) {
        var delta = changed_data[field]
        var name = field.split('.')[1]
        // Select encoder also resets LEDs for some reason
        if (field === 'select_encoder') {
            send_led_update = true
            break
        }
        // Check if this is one of permanently lit LEDs
        var controlmode = false
        for (mode in KontrolF1.controlModeButtons) {
            if (KontrolF1.controlModeButtons[mode] === name) {
                controlmode = true
                break
            }
        }
        if (controlmode) {
            send_led_update = true
            break
        }

        // Update leds if any of these buttons were modified in packet
        if (KontrolF1.buttonNames.indexOf(name) !== -1) {
            KontrolF1.setButtonBrightness(name, delta.value * 0x7f)
            send_led_update = true
            break
        }
        if (name === 'browse') {
            KontrolF1.setButtonBrightness(name, KontrolF1.controller.modifiers.get('browse') * 0x7f)
            send_led_update = true
        }
        // Update leds if any of pads was pressed
        if (/grid_[0-9]/.test(name)) {
            send_led_update = true
            break
        }
    }
    if (send_led_update)
        KontrolF1.controller.sendLightsUpdate()
}

// Turn off all LEDs on exit
KontrolF1.disconnectModeLEDs = function (mode) {
    var grid = KontrolF1.grids[mode]
    var buttons = KontrolF1.playbuttons[mode]
    for (var name in grid + buttons) {
        var button = grid[name]
        if (button.ledname === undefined)
            continue
        engine.connectControl(button.group, button.ledname, KontrolF1.setLED, false)
    }
    if (mode === 'decks')
        engine.connectControl('[Channel' + channel + ']', 'track_loaded', KontrolF1.beatsLights, false)
}

KontrolF1.connectModeLEDs = function (mode) {
    var grid = KontrolF1.grids[mode]
    var buttons = KontrolF1.playbuttons[mode]

    for (var name in grid) {
        var button = grid[name]
        var button_index = parseInt(name.split('_')[1])
        if (button.ledname === undefined)
            continue
        engine.connectControl(button.group, button.ledname, KontrolF1.setLED)
        if (engine.getValue(button.group, button.ledname) > 0)
            value = button.ledcolor
        else
            value = [0, 0, 0]
        KontrolF1.setPADColor(button_index, value[0], value[1], value[2])
    }
    for (var name in buttons) {
        var button = buttons[name]
        var button_index = parseInt(name.split('_')[1])
        if (button.ledname === undefined)
            continue
        engine.connectControl(button.group, button.ledname, KontrolF1.setLED)
        value = engine.getValue(button.group, button.ledname) ? 1 : 0
        KontrolF1.setButtonBrightness('play_' + button_index + '_1', value * button.ledbrightness[0])
        KontrolF1.setButtonBrightness('play_' + button_index + '_2', value * button.ledbrightness[1])
    }
    if (mode === 'decks')
        KontrolF1.beatsLights = KontrolF1.controller.connectLight('[Channel' + channel + ']', 'track_loaded', function (value) {
            KontrolF1.setLED(value, '[Channel' + channel + ']', 'beats_translate_earlier')
            KontrolF1.setLED(value, '[Channel' + channel + ']', 'beats_translate_later')
        })
    KontrolF1.controller.sendLightsUpdate()
}

KontrolF1.setLED = function (value, group, key) {
    var hasUpdates = false

    var grid = KontrolF1.grids[KontrolF1.controlMode]
    for (var name in grid) {
        var button = grid[name]
        var button_index = parseInt(name.split('_')[1])
        if (button.group !== group || button.ledname !== key)
            continue
        if (value)
            value = button.ledcolor
        else
            value = 0, 0, 0
        KontrolF1.setPADColor(button_index, value[0], value[1], value[2])
        hasUpdates = true
    }

    var buttons = KontrolF1.playbuttons[KontrolF1.controlMode]
    for (var name in buttons) {
        var button = buttons[name]
        var button_index = parseInt(name.split('_')[1])
        if (button.group !== group || button.ledname !== key)
            continue
        KontrolF1.setButtonBrightness('play_' + button_index + '_1', value * button.ledbrightness[0])
        KontrolF1.setButtonBrightness('play_' + button_index + '_2', value * button.ledbrightness[1])
        hasUpdates = true
    }

    if (hasUpdates)
        KontrolF1.controller.sendLightsUpdate()
}

KontrolF1.linkKnob = function (mode, knob, group, name) {
    if (!(mode in KontrolF1.knobs))
        KontrolF1.knobs[mode] = {}
    var mapping = {}
    mapping.mode = mode
    mapping.knob = knob
    mapping.group = group
    mapping.name = name
    KontrolF1.knobs[mode][knob] = mapping
}

KontrolF1.knob = function (field) {
    var controller = KontrolF1.controller
    var mode = KontrolF1.knobs[KontrolF1.controlMode]
    if (mode === undefined) {
        HIDDebug('Knob group not mapped in mode ' + KontrolF1.controlMode)
        return
    }
    var knob = mode[field.name]
    if (knob === undefined) {
        HIDDebug('Fader ' + field.name + ' not mapped in ' + KontrolF1.controlMode)
        return
    }
    return KontrolF1.control(knob, field)
}

KontrolF1.linkFader = function (mode, fader, group, name, callback) {
    if (!(mode in KontrolF1.faders))
        KontrolF1.faders[mode] = {}
    var mapping = {}
    mapping.mode = mode
    mapping.fader = fader
    mapping.group = group
    mapping.name = name
    mapping.callback = callback
    KontrolF1.faders[mode][fader] = mapping
}

KontrolF1.fader = function (field) {
    var mode = KontrolF1.faders[KontrolF1.controlMode]
    if (mode === undefined) {
        HIDDebug('Fader group not mapped in mode ' + KontrolF1.controlMode)
        return
    }
    var fader = mode[field.name]
    if (fader === undefined) {
        HIDDebug('Fader ' + field.name + ' not mapped in ' + KontrolF1.controlMode)
        return
    }
    return KontrolF1.control(fader, field)
}

KontrolF1.linkGrid = function (mode, button, group, name, toggle, callback, ledcolor, ledname) {
    if (!(mode in KontrolF1.grids))
        KontrolF1.grids[mode] = {}
    if (ledname === undefined) {
        if (name.match(/hotcue_/))
            ledname = name + '_enabled'
        else
            ledname = name
    }
    if (ledcolor === undefined) {
        ledcolor = [0x7f, 0x7f, 0x7f]
    }
    var mapping = {}
    mapping.mode = mode
    mapping.button = button
    mapping.group = group
    mapping.name = name
    mapping.toggle = toggle
    mapping.ledname = ledname
    mapping.ledcolor = ledcolor
    mapping.callback = callback
    KontrolF1.grids[mode][button] = mapping
}

KontrolF1.grid = function (field) {
    var mode = KontrolF1.grids[KontrolF1.controlMode]
    if (mode === undefined) {
        HIDDebug('Grid button group not mapped in ' + KontrolF1.controlMode)
        return
    }
    var button = mode[field.name]
    if (button === undefined) {
        HIDDebug('Grid ' + field.name + ' not mapped in ' + KontrolF1.controlMode)
        return
    }
    return KontrolF1.button(button, field)
}

KontrolF1.linkPlay = function (mode, button, group, name, toggle, callback, ledname, ledbrightness) {
    if (!(mode in KontrolF1.playbuttons))
        KontrolF1.playbuttons[mode] = {}

    if (ledname === undefined) {
        if (name.match(/hotcue_/))
            ledname = name + '_enabled'
        else
            ledname = name
    }
    if (ledbrightness === undefined)
        ledbrightness = [0x7f, 0x7f]
    var mapping = {}
    mapping.mode = mode
    mapping.button = button
    mapping.group = group
    mapping.name = name
    mapping.toggle = toggle
    mapping.ledname = ledname
    mapping.ledbrightness = ledbrightness
    mapping.callback = callback
    KontrolF1.playbuttons[mode][button] = mapping
}

KontrolF1.play = function (field) {
    var mode = KontrolF1.playbuttons[KontrolF1.controlMode]
    if (mode === undefined) {
        HIDDebug('Play button group not mapped in ' + KontrolF1.controlMode)
        return
    }
    var button = mode[field.name]
    if (button === undefined) {
        HIDDebug('Play button ' + field.name + ' not mapped in ' + KontrolF1.controlMode)
        return
    }
    return KontrolF1.button(button, field)
}

KontrolF1.control = function (control, field) {
    if (control.callback !== undefined) {
        control.callback(control, field)
        return
    }
    engine.setParameter(control.group, control.name, field.value / 4096)
}

KontrolF1.button = function (button, field) {
    if (button.callback !== undefined) {
        button.callback(button, field)
        return
    }
    var controller = KontrolF1.controller
    if (button.toggle) {
        if (button.name === 'play')
            controller.togglePlay(button.group, field)
        else
            controller.toggle(button.group, button.name, field.value)
    } else {
        engine.setParameter(button.group, button.name, field.value)
    }
}

KontrolF1.switchControlMode = function (field) {
    if (field.name === 'quant') {
        KontrolF1.setControlMode('samplers')
    } else if (field.name === 'capture') {
        KontrolF1.setControlMode('decks')
    } else {
        HIDDebug('Unconfigured mode selector button: ' + field.name)
        return
    }
}

KontrolF1.printField = function (field) {
    HIDDebug('Field name: ' + field.name)
    HIDDebug('Field: ' + tostring(field))
}

KontrolF1.setControlMode = function (mode) {
    if (mode === KontrolF1.controlMode)
        return
    if (!(mode in KontrolF1.controlModeButtons)) {
        HIDDebug('Unconfigured control mode: ' + mode)
        return
    }

    if (KontrolF1.controlMode !== undefined) {
        KontrolF1.disconnectModeLEDs(KontrolF1.controlMode)
        KontrolF1.setButtonBrightness(KontrolF1.controlModeButtons[KontrolF1.controlMode], 0)
    }
    KontrolF1.controlMode = mode
    KontrolF1.connectModeLEDs(KontrolF1.controlMode)
    KontrolF1.setButtonBrightness(KontrolF1.controlModeButtons[KontrolF1.controlMode], 0x7f)
    KontrolF1.controller.sendLightsUpdate()
}

KontrolF1.scroll = function (field) {
    var controller = KontrolF1.controller
    if (controller.modifiers.get('browse')) {
        if (controller.modifiers.get('shift')) {
            const cur = engine.getValue('[Channel' + channel + ']', 'beatjump_size')
            engine.setParameter('[Channel' + channel + ']', 'beatjump_size', field.delta > 0 ? cur * 2 : cur / 2)
        } else {
            engine.setParameter('[Channel' + channel + ']', field.delta > 0 ? 'beatjump_forward' : 'beatjump_backward', 1)
        }
    } else {
        if (controller.modifiers.get('shift')) {
            engine.setParameter('[Channel' + channel + ']', field.delta > 0 ? 'rate_perm_up' : 'rate_perm_down', 1)
        } else {
            engine.setParameter('[Playlist]', 'SelectTrackKnob', field.delta)
        }
    }
}

KontrolF1.scrollButton = function (button) {
    var controller = KontrolF1.controller
    if (controller.modifiers.get('browse')) {
        if (button.value === controller.buttonStates.released)
            return
        const newVal = Math.round(engine.getValue('[Channel' + channel + ']', 'beatjump_size') + 1)
        engine.setParameter('[Channel' + channel + ']', 'beatjump_size', newVal)
        engine.setParameter('[Channel' + channel + ']', 'beatloop_size', newVal)
    } else {
        engine.setParameter('[Channel' + channel + ']', 'LoadSelectedTrack', button.value)
    }
}

KontrolF1.registerCallbacks = function () {
    var controller = KontrolF1.controller

    HIDDebug('Registering HID callbacks')

    controller.setCallback('control', 'hid', 'select_encoder', KontrolF1.scroll)
    controller.setCallback('control', 'hid', 'select_push', KontrolF1.scrollButton)
    controller.linkModifier('hid', 'shift', 'shift')

    controller.setCallback('control', 'hid', 'sync', function (button) {
        if (button.value === KontrolF1.controller.buttonStates.released) {
            if (Date.now() > KontrolF1.syncTime + 400) {
                engine.setParameter('[Channel' + channel + ']', 'sync_mode', engine.getValue('[Channel' + channel + ']', 'sync_mode') > 0 ? 0 : 1)
            }
        } else {
            KontrolF1.syncTime = Date.now()
            engine.setParameter('[Channel' + channel + ']', 'beatsync', button.value)
        }
    })

    controller.setCallback('control', 'hid', 'capture', KontrolF1.switchControlMode)
    controller.setCallback('control', 'hid', 'quant', KontrolF1.switchControlMode)

    controller.setCallback('control', 'hid', 'reverse', KontrolF1.switchControlMode)
    controller.setCallback('control', 'hid', 'type', KontrolF1.switchControlMode)
    controller.setCallback('control', 'hid', 'size', KontrolF1.printField)

    KontrolF1.controller.modifiers.add('browse')
    controller.setCallback('control', 'hid', 'browse', function (button) {
        if (button.value === KontrolF1.controller.buttonStates.released)
            return
        const mod = KontrolF1.controller.modifiers
        mod.set(button.name, !mod.get(button.name))
    })

    for (i = 1; i < 5; i++) {
        controller.setCallback('control', 'hid', 'knob_' + i, KontrolF1.knob)
        controller.setCallback('control', 'hid', 'fader_' + i, KontrolF1.fader)
        controller.setCallback('control', 'hid', 'play_' + i, KontrolF1.play)
    }
    for (i = 1; i < 17; i++) {
        controller.setCallback('control', 'hid', 'grid_' + i, KontrolF1.grid)
    }

    for (i = 1; i < 4; i++) {
        KontrolF1.linkKnob('decks', 'knob_' + i, '[EffectRack1_EffectUnit' + channel + '_Effect' + i + ']', 'meta')
    }
    KontrolF1.linkKnob('decks', 'knob_4', '[EffectRack1_EffectUnit' + channel + ']', 'mix')

    KontrolF1.linkFader('decks', 'fader_1', '[Channel1]', 'rate')
    KontrolF1.linkFader('decks', 'fader_2', '[Channel1]', 'volume')
    KontrolF1.linkFader('decks', 'fader_3', '[Channel2]', 'volume')
    KontrolF1.linkFader('decks', 'fader_4', '[Channel2]', 'rate')

    for (i = 1; i <= 16; i++) {
        KontrolF1.linkGrid('decks', 'grid_' + i, '[Channel' + channel + ']', 'hotcue_' + i, false, KontrolF1.hotcue, [0, 64, 127])
    }
    // Map 3rd row for macro controls
    const macro_offset = 8
    for (i = 1; i <= 4; i++) {
        KontrolF1.linkGrid('decks', 'grid_' + (macro_offset + i), '[Channel' + channel + ']', 'macro_' + i + '_activate', false, undefined, [0x7f, 0x44, 0], 'macro_' + i + '_status')
    }
    // Map 4th row for loop controls: activate beatloop, toggle, halve, double
    const loop_offset = 12
    KontrolF1.linkGrid('decks', 'grid_' + (loop_offset + 1), '[Channel' + channel + ']', 'beatloop_activate', false, undefined, [0, 0x7f, 0])
    KontrolF1.linkGrid('decks', 'grid_' + (loop_offset + 2), '[Channel' + channel + ']', 'reloop_toggle', false, undefined, [0x7f, 0, 0])
    KontrolF1.linkGrid('decks', 'grid_' + (loop_offset + 3), '[Channel' + channel + ']', 'loop_halve', false, undefined, [0, 0x7f, 0])
    KontrolF1.linkGrid('decks', 'grid_' + (loop_offset + 4), '[Channel' + channel + ']', 'loop_double', false, undefined, [0, 0x7f, 0])

    // Using 2 controllers side-by-side, the controller for Channel1 is on the left, so these controls are mirrored for convenience
    const mod = channel % 2
    KontrolF1.linkPlay('decks', 'play_' + (1 + mod * 3), '[Channel' + channel + ']', 'play', true)
    KontrolF1.linkPlay('decks', 'play_' + (2 + mod), '[Channel' + channel + ']', 'cue', undefined, function (button, field) {
        var name = button.name + '_'
        if (controller.modifiers.get('browse')) {
            if (controller.modifiers.get('shift')) {
                name += 'set'
            } else {
                name += 'gotoandstop'
            }
        } else {
            if (controller.modifiers.get('shift')) {
                name += 'play'
            } else {
                name += 'default'
            }
        }
        engine.setParameter(button.group, name, field.value)
    }, 'cue_default')
    KontrolF1.linkPlay('decks', 'play_' + (3 - mod * 2), '[Channel' + channel + ']', 'beats_translate_earlier', undefined, KontrolF1.translateBeats, undefined, [32, 100])
    KontrolF1.linkPlay('decks', 'play_' + (4 - mod * 2), '[Channel' + channel + ']', 'beats_translate_later', undefined, KontrolF1.translateBeats, undefined, [100, 32])

    for (var i = 1; i < 5; i++) {
        KontrolF1.linkKnob('samplers', 'knob_' + i, '[Sampler' + i + ']', 'rate')
        KontrolF1.linkFader('samplers', 'fader_' + i, '[Sampler' + i + ']', 'pregain')
        for (var row = 0; row < 4; row++) {
            KontrolF1.linkGrid('samplers', 'grid_' + (i + row * 4), '[Sampler' + i + ']', 'hotcue_' + row, false, KontrolF1.hotcue, [0, 100, 100])
        }
        KontrolF1.linkPlay('samplers', 'play_' + i, '[Sampler' + i + ']', 'play', true)
    }
}

KontrolF1.translateBeats = function (button, field) {
    if (field.value === 0) {
        if (KontrolF1.translateBeatsTimer)
            engine.stopTimer(KontrolF1.translateBeatsTimer)
    } else {
        engine.setParameter(button.group, button.name, field.value)
        KontrolF1.translateBeatsTimer = engine.beginTimer(
            50,
            'engine.setParameter("' + button.group + '", "' + button.name + '", 1)'
        )
    }
}

KontrolF1.hotcue = function (button, field) {
    var controller = KontrolF1.controller
    var name = button.name + '_'
    if (controller.modifiers.get('shift'))
        name = name + 'clear'
    else if (controller.modifiers.get('browse'))
        if (engine.getValue(button.group, name + 'enabled'))
            name = name + 'gotoandstop'
        else
            name = name + 'set'
    else
        name = name + 'activate'
    engine.setParameter(button.group, name, field.value)
}

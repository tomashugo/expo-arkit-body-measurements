Pod::Spec.new do |s|
  s.name           = 'expo-arkit-body-measurements'
  s.version        = '1.0.0'
  s.summary        = 'Expo module for ARKit body measurements'
  s.description    = 'Expo module for ARKit body measurements using ARKit'
  s.author         = 'roupinha'
  s.homepage       = 'https://github.com/expo/expo'
  s.platforms      = { :ios => '13.4' }
  s.source         = { :git => '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Swift/Objective-C compatibility and modular headers
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule',
    'SWIFT_VERSION' => '5.0',
    'CLANG_ENABLE_MODULES' => 'YES',
    'SWIFT_OBJC_INTEROP_MODE' => 'objc'
  }

  s.source_files = "ios/**/*.{swift}"
  
  # Ensure proper framework search paths
  s.frameworks = 'ARKit', 'RealityKit'
end


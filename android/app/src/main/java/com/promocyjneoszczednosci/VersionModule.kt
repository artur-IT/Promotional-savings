package com.promocyjneoszczednosci

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class VersionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "VersionModule"

    @ReactMethod
    fun getVersion(promise: Promise) {
        promise.resolve(BuildConfig.VERSION_NAME)
    }
}


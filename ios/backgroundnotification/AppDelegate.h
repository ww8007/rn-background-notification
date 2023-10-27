#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>
#import <Firebase.h>
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : EXAppDelegateWrapper<UNUserNotificationCenterDelegate>

@end

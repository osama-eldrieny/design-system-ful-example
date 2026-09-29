# AppsNotifications

    ),
  }}
  optionStories={{ appearance: 'Appearances' }}
  extras={[{ title: 'States', story: 'States' }]}
  behaviorStory="RightToLeft"
  matrix={
    <AppsNotifications
      style={{ maxInlineSize: 240 }}
      title="Notifications"
      items={[
        { id: 'slack', name: 'Slack' },
        { id: 'github', name: 'GitHub', defaultEnabled: false },
      ]}
    />
  }
/>

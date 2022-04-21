export const checkPermission = async (): Promise<{ camera: PermissionState; microphone: PermissionState }> => {
  // @ts-ignore
  const cameraPermission = await window.navigator.permissions.query({ name: 'camera' });
  // @ts-ignore
  const microphonePermission = await window.navigator.permissions.query({ name: 'microphone' });

  return {
    camera: cameraPermission.state,
    microphone: microphonePermission.state
  };
};

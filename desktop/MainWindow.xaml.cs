using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using CefSharp;
using CefSharp.Wpf;
using Microsoft.Win32;
using Newtonsoft.Json;

namespace Windows
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        public MainWindow()
        {
            Directory.CreateDirectory("strings");
            InitializeComponent();
            Cef.Initialize(new CefSettings
            {
                CefCommandLineArgs =
                {
                    {"disable-gpu-vsync", "1"},
                    {"disable-gpu", "1"},
                    {"disable-gpu-compositing", "1"},
                }
            });
            Background = Brushes.Gray;
            SizeChanged += (sender, args) => { Debug.WriteLine(args.NewSize); };
            Init();
        }

        private void Init()
        {
            var bricksUrl = Environment.GetEnvironmentVariable("WINDOWS_URL");
            var browser = new ChromiumWebBrowser()
            {
                Address = string.IsNullOrEmpty(bricksUrl) ? "https://mazhuravlev.github.io/windows/" : bricksUrl,
                BrowserSettings = new BrowserSettings()
            };
            var w = 880;
            var h = 943;
            browser.Width = w;
            browser.Height = h;
            Width = w + 18;
            Grid.Children.Add(browser);
            var screenHeight = SystemParameters.VirtualScreenHeight;
            if (screenHeight >= h)
            {
                Height = h;
                ScrollViewer.CanContentScroll = false;
                ScrollViewer.VerticalScrollBarVisibility = ScrollBarVisibility.Hidden;
            }
            else
            {
                Height = screenHeight - 100;
                Top = 0;
                ResizeMode = ResizeMode.CanResize;
            }

            browser.JavascriptObjectRepository.Register("vasya", new Vasya());
            KeyDown += (sender, args) =>
            {
                if (args.Key == Key.F12) browser.ShowDevTools();
            };
        }
    }


    class Vasya
    {
        private string _prevPath;

        public void SaveString(string key, string value)
        {
            try
            {
                File.WriteAllText(Path.Combine("strings", key), value);
            }
            catch
            {
                //
            }
        }

        public string LoadString(string key)
        {
            var file = Path.Combine("strings", key);
            if (!File.Exists(file)) return null;
            try
            {
                var str = File.ReadAllText(file);
                return str;
            }
            catch
            {
                return null;
            }
        }

        public void Save(string json)
        {
            var saveFileDialog = new SaveFileDialog
            {
                AddExtension = true,
                Filter = "json files (*.json)|*.json",
                InitialDirectory = _prevPath
            };
            var result = saveFileDialog.ShowDialog();
            if (!result.HasValue || !result.Value) return;
            _prevPath = Path.GetDirectoryName(saveFileDialog.FileName);
            File.WriteAllText(saveFileDialog.FileName, json);
        }

        // ReSharper disable once UnusedMember.Global
        public string LoadTextures()
        {
            var openFileDialog = new OpenFileDialog()
            {
                InitialDirectory = _prevPath,
                Filter = "png files (*.png)|*.png",
                Multiselect = true
            };
            var result = openFileDialog.ShowDialog();
            if (!result.HasValue || !result.Value) return null;
            var textures = openFileDialog.FileNames.Select(x =>
            {
                var imageBytes = File.ReadAllBytes(x);  
                var base64String = Convert.ToBase64String(imageBytes);
                using (var img = System.Drawing.Image.FromFile(x))
                {
                    return new TextureEntry
                    {
                        Filename = Path.GetFileName(x),
                        Data = base64String,
                        Width = img.Width,
                        Height = img.Height
                    };
                }
            }).ToList();
            return JsonConvert.SerializeObject(textures);
        }

        internal class TextureEntry
        {
            public string Filename { get; set; }

            public string Data { get; set; }
            
            public int Width { get; set; }
            
            public int Height { get; set; }
        }

        public string Load()
        {
            var openFileDialog = new OpenFileDialog()
            {
                InitialDirectory = _prevPath,
                Filter = "json files (*.json)|*.json"
            };
            var result = openFileDialog.ShowDialog();
            if (!result.HasValue || !result.Value) return null;
            return File.ReadAllText(openFileDialog.FileName);
        }
    }
}
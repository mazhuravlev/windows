using System;
using System.Diagnostics;
using System.IO;
using System.Windows.Input;
using System.Windows.Media;
using CefSharp;
using CefSharp.Wpf;
using Microsoft.Win32;

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
            var bricksUrl = Environment.GetEnvironmentVariable("WINDOWS_URL");
            InitializeComponent();
            Cef.Initialize(new CefSettings{CefCommandLineArgs =
            {
                {"disable-gpu-vsync","1"},
                {"disable-gpu","1"},
                {"disable-gpu-compositing","1"},
            }});
            var browser = new ChromiumWebBrowser()
            {
                Address = string.IsNullOrEmpty(bricksUrl) ? "https://mazhuravlev.github.io/windows/" : bricksUrl,
                BrowserSettings = new BrowserSettings
                {
                    
                }
            };
            Grid.Children.Add(browser);
            var w = 880;
            var h = 943;
            browser.Width = w;
            browser.Height = h;
            Width = w + 18;
            Height = h + 0;
            browser.JavascriptObjectRepository.Register("vasya", new Vasya());
            KeyDown += (sender, args) =>
            {
                if(args.Key == Key.F12) browser.ShowDevTools();
            };
            Background = Brushes.Gray;
            SizeChanged += (sender, args) => { Debug.WriteLine(args.NewSize); };
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